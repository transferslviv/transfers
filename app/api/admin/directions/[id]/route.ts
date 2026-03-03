import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import DirectionPage from '@/models/DirectionPage';

// GET - get single direction page by directionId
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    const page = await DirectionPage.findOne({ directionId: id });
    if (!page) {
      return NextResponse.json({ success: false, error: 'Не знайдено' }, { status: 404 });
    }
    return NextResponse.json({ success: true, page });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT - update direction page
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = request.cookies.get('admin-session');
    if (!session) {
      return NextResponse.json({ success: false, error: 'Не авторизовано' }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();
    const data = await request.json();

    const page = await DirectionPage.findOneAndUpdate(
      { directionId: id },
      data,
      { new: true, runValidators: true }
    );

    if (!page) {
      return NextResponse.json({ success: false, error: 'Не знайдено' }, { status: 404 });
    }

    return NextResponse.json({ success: true, page });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - delete direction page
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = request.cookies.get('admin-session');
    if (!session) {
      return NextResponse.json({ success: false, error: 'Не авторизовано' }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();
    const page = await DirectionPage.findOneAndDelete({ directionId: id });

    if (!page) {
      return NextResponse.json({ success: false, error: 'Не знайдено' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
