import { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import AdminLog from '@/models/AdminLog';

interface LogData {
  adminId: string;
  adminUsername: string;
  action: 'login' | 'logout' | 'settings_update' | 'admin_create' | 'admin_update' | 'admin_delete' | 'car_create' | 'car_update' | 'car_delete';
  details?: string;
  status?: 'success' | 'failed';
}

export async function createLog(request: NextRequest, data: LogData) {
  try {
    await connectDB();
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    await AdminLog.create({
      adminId: data.adminId,
      adminUsername: data.adminUsername,
      action: data.action,
      details: data.details || '',
      ipAddress,
      userAgent,
      status: data.status || 'success',
    });
  } catch (error) {
    console.error('Error creating admin log:', error);
  }
}

export async function logFailedLogin(request: NextRequest, username: string, reason: string) {
  try {
    await connectDB();
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    await AdminLog.create({
      adminId: '000000000000000000000000',
      adminUsername: username,
      action: 'login',
      details: reason,
      ipAddress,
      userAgent,
      status: 'failed',
    });
  } catch (error) {
    console.error('Error logging failed login:', error);
  }
}
