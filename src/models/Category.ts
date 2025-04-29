import { Schema, model } from 'mongoose';
import { BaseDocument } from './interfaces';

export interface ICategory extends BaseDocument {
  name: string;
}

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  userId: { type: String, required: true }
});

categorySchema.index({ userId: 1, name: 1 }, { unique: true });

export const Category = model<ICategory>('Category', categorySchema);