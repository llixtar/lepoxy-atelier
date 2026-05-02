import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function GET(req: Request) {
  // Перевірка секретного ключа для безпеки
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    // Простий запит до таблиці Bag для активності бази
    const { data, error } = await supabaseAdmin
      .from('Bag')
      .select('id')
      .limit(1);

    if (error) throw error;

    return NextResponse.json({ 
      success: true, 
      message: 'Supabase is awake!', 
      timestamp: new Date().toISOString() 
    });
  } catch (error: any) {
    console.error('Keep-alive error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
