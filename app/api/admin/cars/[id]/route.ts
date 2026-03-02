import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import TransferCar from '@/models/TransferCar';

// GET - отримати одне авто
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    const car = await TransferCar.findById(id);

    if (!car) {
      return NextResponse.json(
        { success: false, error: 'Авто не знайдено' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, car });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT - оновити авто
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

    const car = await TransferCar.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!car) {
      return NextResponse.json(
        { success: false, error: 'Авто не знайдено' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, car });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - видалити авто
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
    const car = await TransferCar.findByIdAndDelete(id);

    if (!car) {
      return NextResponse.json(
        { success: false, error: 'Авто не знайдено' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Авто видалено' });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
