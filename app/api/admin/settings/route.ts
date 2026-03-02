import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import SiteSettings from '@/models/SiteSettings';
import Admin from '@/models/Admin';
import { createLog } from '@/lib/adminLogger';

// GET — public, no auth required (used by frontend)
export async function GET() {
  try {
    await connectDB();
    
    let settings = await SiteSettings.findOne().lean();
    
    if (!settings) {
      settings = await SiteSettings.create({});
      settings = settings.toObject();
    }

    return NextResponse.json({ success: true, data: settings });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PUT — admin only, update settings
export async function PUT(request: NextRequest) {
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

    const body = await request.json();

    const allowedFields = ['phone', 'telegramBot', 'telegramProfile', 'whatsapp', 'instagram', 'tiktok', 'address', 'googleMapsLink'];
    const updateData: any = {};

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    let settings = await SiteSettings.findOne();
    
    if (!settings) {
      settings = await SiteSettings.create(updateData);
    } else {
      Object.assign(settings, updateData);
      await settings.save();
    }

    // Log the change
    const changedFields = Object.keys(updateData).join(', ');
    await createLog(request, {
      adminId: admin._id.toString(),
      adminUsername: admin.username,
      action: 'settings_update',
      details: `Оновлено: ${changedFields}`,
      status: 'success',
    });

    return NextResponse.json({ success: true, data: settings });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
