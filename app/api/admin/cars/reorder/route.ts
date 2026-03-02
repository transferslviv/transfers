import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import TransferCar from '@/models/TransferCar';

// PUT - змінити порядок авто
export async function PUT(request: NextRequest) {
  try {
    const session = request.cookies.get('admin-session');
    if (!session) {
      return NextResponse.json({ success: false, error: 'Не авторизовано' }, { status: 401 });
    }

    await connectDB();
    const { cars } = await request.json();

    if (!Array.isArray(cars)) {
      return NextResponse.json(
        { success: false, error: 'Невірний формат даних' },
        { status: 400 }
      );
    }

    const bulkOps = cars.map((car: { id: string; order: number }) => ({
      updateOne: {
        filter: { _id: car.id },
        update: { $set: { order: car.order } },
      },
    }));

    await TransferCar.bulkWrite(bulkOps);

    return NextResponse.json({ success: true, message: 'Порядок оновлено' });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
