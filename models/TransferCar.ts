import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ITransferCar extends Document {
  name: string;
  nameEn?: string;
  description: string;
  descriptionEn?: string;
  images: string[];
  mainImage: string;
  passengers: number;
  luggage: number;
  child: boolean;
  pet: boolean;
  showPassengers: boolean;
  showLuggage: boolean;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const TransferCarSchema = new Schema<ITransferCar>({
  name: { 
    type: String, 
    required: [true, 'Назва автомобіля обов\'язкова'],
    trim: true
  },
  nameEn: { 
    type: String, 
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Опис обов\'язковий'],
    trim: true
  },
  descriptionEn: {
    type: String,
    trim: true
  },
  images: [{
    type: String,
    required: true
  }],
  mainImage: {
    type: String,
    required: [true, 'Головне зображення обов\'язкове']
  },
  passengers: {
    type: Number,
    required: true,
    default: 3
  },
  luggage: {
    type: Number,
    required: true,
    default: 2
  },
  child: {
    type: Boolean,
    default: true
  },
  pet: {
    type: Boolean,
    default: true
  },
  showPassengers: {
    type: Boolean,
    default: true
  },
  showLuggage: {
    type: Boolean,
    default: true
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  collection: 'transfercars'
});

const TransferCar: Model<ITransferCar> = mongoose.models.TransferCar || mongoose.model<ITransferCar>('TransferCar', TransferCarSchema);
export default TransferCar;
