import { model, Schema } from 'mongoose';

const User = new Schema({
    email: { type: 'String', required: true },
    password: { type: 'String', required: true },
    image: { type: 'String', required: true },
    firstName: { type: 'String', required: true },
    lastName: { type: 'String', required: true },
    birthDate: { type: 'Date', required: true },
    address: { type: 'String', required: true },
    phoneNumber: { type: 'String', required: true },
    createdAt: { type: 'Date', required: true },
    updatedAt: { type: 'Date', required: true },
  }, { timestamps: true },
);

export const UserModel = model('User', User);
