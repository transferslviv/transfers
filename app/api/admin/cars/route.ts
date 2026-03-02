import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import TransferCar from '@/models/TransferCar';

// GET - отримати всі авто (публічний доступ)
export async function GET() {
  try {
    await connectDB();
    const cars = await TransferCar.find().sort({ order: 1, createdAt: -1 });
    return NextResponse.json({ success: true, cars });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST - створити нове авто
export async function POST(request: NextRequest) {
  try {
    const session = request.cookies.get('admin-session');
    if (!session) {
      return NextResponse.json({ success: false, error: 'Не авторизовано' }, { status: 401 });
    }

    await connectDB();
    const data = await request.json();

    // Auto-increment order
    const lastCar = await TransferCar.findOne().sort({ order: -1 });
    const order = lastCar ? lastCar.order + 1 : 0;

    const car = await TransferCar.create({
      ...data,
      order,
    });

    return NextResponse.json({ success: true, car }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
