import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import DirectionPage from '@/models/DirectionPage';

// GET - get all direction pages
export async function GET() {
  try {
    await connectDB();
    const pages = await DirectionPage.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, pages });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST - create new direction page
export async function POST(request: NextRequest) {
  try {
    const session = request.cookies.get('admin-session');
    if (!session) {
      return NextResponse.json({ success: false, error: 'Не авторизовано' }, { status: 401 });
    }

    await connectDB();
    const data = await request.json();

    const page = await DirectionPage.create(data);
    return NextResponse.json({ success: true, page }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
