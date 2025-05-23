import { Schema, model } from 'mongoose';
import { BaseDocument } from './interfaces';

export interface IAccount extends BaseDocument {
  name: string;
  balance: number;
  isDefault: boolean;
}

const accountSchema = new Schema<IAccount>({
  name: { type: String, required: true },
  userId: { type: String, required: true },
  balance: { type: Number, required: true, default: 0 },
  isDefault: { type: Boolean, required: true, default: false }
});

accountSchema.index({ userId: 1, name: 1 }, { unique: true });

export const Account = model<IAccount>('Account', accountSchema);