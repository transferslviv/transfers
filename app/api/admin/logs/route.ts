import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import AdminLog from '@/models/AdminLog';
import Admin from '@/models/Admin';

export async function GET(request: NextRequest) {
  try {
    const adminId = request.cookies.get('admin-session')?.value;
    if (!adminId) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const admin = await Admin.findById(adminId);
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const action = searchParams.get('action');
    const status = searchParams.get('status');

    const filter: any = {};
    if (action) filter.action = action;
    if (status) filter.status = status;

    const logs = await AdminLog.find(filter).sort({ createdAt: -1 }).limit(limit).skip((page - 1) * limit).lean();
    const total = await AdminLog.countDocuments(filter);

    return NextResponse.json({
      success: true,
      data: {
        logs,
        pagination: { page, limit, total, pages: Math.ceil(total / limit) },
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
