import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Admin from '@/models/Admin';
import { createLog, logFailedLogin } from '@/lib/adminLogger';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { username, password } = await request.json();

    const admin = await Admin.findOne({ username });

    if (!admin) {
      await logFailedLogin(request, username, 'Користувача не знайдено');
      return NextResponse.json({ success: false, error: 'Невірні дані для входу' }, { status: 401 });
    }

    const isPasswordValid = await admin.comparePassword(password);

    if (!isPasswordValid) {
      await logFailedLogin(request, username, 'Невірний пароль');
      return NextResponse.json({ success: false, error: 'Невірні дані для входу' }, { status: 401 });
    }

    await createLog(request, {
      adminId: admin._id.toString(),
      adminUsername: admin.username,
      action: 'login',
      details: 'Успішний вхід в систему',
      status: 'success',
    });

    const response = NextResponse.json({
      success: true,
      data: { id: admin._id, username: admin.username, email: admin.email },
    });

    response.cookies.set('admin-session', admin._id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
