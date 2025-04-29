import { Schema, model } from 'mongoose';
import { BaseDocument } from './interfaces';

export interface IUser extends BaseDocument {
  telegramId: string;
}

const userSchema = new Schema<IUser>({
  telegramId: { type: String, required: true, unique: true }
});

export const User = model<IUser>('User', userSchema);