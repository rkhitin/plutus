import { Schema, model } from 'mongoose';
import { BaseDocument } from './interfaces';

export interface IReason extends BaseDocument {
  name: string;
  type: 'debit' | 'credit';
}

const reasonSchema = new Schema<IReason>({
  name: { type: String, required: true },
  userId: { type: String, required: true },
  type: { type: String, enum: ['debit', 'credit'], required: true }
});

reasonSchema.index({ userId: 1, name: 1 }, { unique: true });

export const Reason = model<IReason>('Reason', reasonSchema);