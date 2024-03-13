import { model, Schema } from 'mongoose';

export enum Gender {
  Male = 'male',
  Female = 'female',
}

export interface User {
  image: string;
  username: string;
  password: string;
  email: string;
  fullName: string;
  address: string;
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

export const UserSchema = new Schema<User>({
  image: { type: 'String' },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  address: { type: String, required: false },
  phoneNumber: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const UserModel = model<User>('User', UserSchema);
