import { Schema, model } from 'mongoose';
import { BaseDocument } from './interfaces';

export interface ITransaction extends BaseDocument {
  categoryId?: string;
  reasonId: string;
  accountId: string;
  amount: number;
  date: Date;
  telegramMessageId: string;
  comment?: string;
}

const transactionSchema = new Schema<ITransaction>({
  userId: { type: String, required: true },
  categoryId: { type: String, required: false },
  reasonId: { type: String, required: true },
  accountId: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true, default: Date.now },
  telegramMessageId: { type: String, required: true },
  comment: { type: String, required: false }
});

transactionSchema.index({ userId: 1, date: -1 });

export const Transaction = model<ITransaction>('Transaction', transactionSchema);