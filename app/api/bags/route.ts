import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Тепер ми передаємо ТІЛЬКИ дані з форми. 
    // База сама додасть ID, createdAt та updatedAt.
    const { data, error } = await supabaseAdmin
      .from('Bag')
      .insert([
        {
          name: body.name,
          price: parseFloat(body.price.replace(',', '.')) || 0, 
          model: body.model,
          dimensions: body.dimensions,
          collection: body.collection,
          color: body.color,
          description: body.description,
          images: body.images, 
          isAvailable: true,
        }
      ])
      .select();

    if (error) {
      console.error('SUPABASE DB ERROR:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data[0]);
  } catch (error: any) {
    console.error('SERVER FATAL ERROR:', error);
    return NextResponse.json({ error: 'Помилка сервера' }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Дістаємо всі сумки, сортуючи від найновіших до найстаріших
    const { data, error } = await supabaseAdmin
      .from('Bag')
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) {
      console.error('Помилка при отриманні сумок:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: 'Помилка сервера' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updateData } = body;

    if (!id) return NextResponse.json({ error: 'ID не вказано' }, { status: 400 });

    // Форматуємо ціну
    updateData.price = parseFloat(updateData.price.toString().replace(',', '.')) || 0;
    updateData.updatedAt = new Date().toISOString();

    const { data, error } = await supabaseAdmin
      .from('Bag')
      .update(updateData)
      .eq('id', id)
      .select();

    if (error) {
      console.error('SUPABASE PUT ERROR:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data[0]);
  } catch (error: any) {
    console.error('SERVER PUT ERROR:', error);
    return NextResponse.json({ error: 'Помилка сервера' }, { status: 500 });
  }
}

// МЕТОД ДЛЯ ВИДАЛЕННЯ СУМКИ (ІЗ ЗАЧИСТКОЮ ФОТО)
export async function DELETE(req: Request) {
  try {
    // Отримуємо ID з URL (наприклад: /api/bags?id=123)
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID не вказано' }, { status: 400 });

    // 1. Спочатку дістаємо сумку, щоб отримати посилання на її картинки
    const { data: bag, error: fetchError } = await supabaseAdmin
      .from('Bag')
      .select('images')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;

    // 2. Якщо є картинки — видаляємо їх з бакета Supabase
    if (bag?.images && bag.images.length > 0) {
      const fileNames = bag.images.map((url: string) => url.split('/').pop()); // Витягуємо назви файлів з кінця посилань
      
      const { error: storageError } = await supabaseAdmin.storage
        .from('bags')
        .remove(fileNames);
        
      if (storageError) console.error('Помилка видалення картинок з бакета:', storageError);
    }

    // 3. Видаляємо саму сумку з бази даних
    const { error: deleteError } = await supabaseAdmin
      .from('Bag')
      .delete()
      .eq('id', id);

    if (deleteError) {
      console.error('SUPABASE DELETE ERROR:', deleteError);
      return NextResponse.json({ error: deleteError.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('SERVER DELETE ERROR:', error);
    return NextResponse.json({ error: 'Помилка сервера' }, { status: 500 });
  }
}