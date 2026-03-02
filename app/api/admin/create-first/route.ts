import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Admin from '@/models/Admin';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const existingAdmins = await Admin.countDocuments();
    if (existingAdmins > 0) {
      return NextResponse.json(
        { success: false, error: 'Адміністратор вже існує. Видаліть існуючих адмінів перед створенням нового.' },
        { status: 400 }
      );
    }

    const { username, email, password } = await request.json();

    if (!username || !email || !password) {
      return NextResponse.json({ success: false, error: 'Всі поля обов\'язкові' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ success: false, error: 'Пароль має містити мінімум 6 символів' }, { status: 400 });
    }

    const admin = await Admin.create({ username, email, password });

    return NextResponse.json({
      success: true,
      message: 'Адміністратор успішно створений!',
      data: { username: admin.username, email: admin.email },
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Користувач з таким username або email вже існує' }, { status: 400 }
      );
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
