import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Admin from '@/models/Admin';
import { createLog } from '@/lib/adminLogger';

export async function POST(request: NextRequest) {
  try {
    const adminId = request.cookies.get('admin-session')?.value;

    if (adminId) {
      await connectDB();
      const admin = await Admin.findById(adminId);

      if (admin) {
        await createLog(request, {
          adminId: admin._id.toString(),
          adminUsername: admin.username,
          action: 'logout',
          details: 'Вихід з системи',
          status: 'success',
        });
      }
    }
  } catch (error) {
    console.error('Error logging logout:', error);
  }

  const response = NextResponse.json({ success: true, message: 'Вихід успішний' });
  response.cookies.delete('admin-session');
  return response;
}
