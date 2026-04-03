import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

// ОТРИМАННЯ ВСІХ ВІДГУКІВ
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('Review')
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ДОДАВАННЯ НОВОГО ВІДГУКУ
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { data, error } = await supabaseAdmin
      .from('Review')
      .insert([{
        authorName: body.authorName,
        text: body.text,
        image: body.image, // Очікуємо одне посилання на фото
      }])
      .select();

    if (error) throw error;
    return NextResponse.json(data[0]);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ОНОВЛЕННЯ ВІДГУКУ
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updateData } = body;
    
    if (!id) return NextResponse.json({ error: 'ID не вказано' }, { status: 400 });

    updateData.updatedAt = new Date().toISOString();

    const { data, error } = await supabaseAdmin
      .from('Review')
      .update(updateData)
      .eq('id', id)
      .select();

    if (error) throw error;
    return NextResponse.json(data[0]);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ВИДАЛЕННЯ ВІДГУКУ (З ОЧИЩЕННЯМ ФОТО)
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID не вказано' }, { status: 400 });

    // Дістаємо відгук, щоб перевірити, чи є там картинка
    const { data: review } = await supabaseAdmin
      .from('Review')
      .select('image')
      .eq('id', id)
      .single();

    // Видаляємо фото зі Storage, якщо воно є
    if (review?.image) {
      const fileName = review.image.split('/').pop();
      await supabaseAdmin.storage.from('bags').remove([fileName]); // Юзаємо той самий бакет 'bags' для простоти
    }

    // Видаляємо запис
    const { error } = await supabaseAdmin.from('Review').delete().eq('id', id);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}