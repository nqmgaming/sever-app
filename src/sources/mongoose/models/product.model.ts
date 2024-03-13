import { Type } from '@mikro-orm/core';
import { model, Schema, Types } from 'mongoose';

export interface Product {
  name: string;
  description: string;
  price: number;
  category: Types.ObjectId;
  image: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

export const ProductSchema = new Schema<Product>({
  name: { type: 'String', required: true },
  description: { type: 'String', required: true },
  price: { type: 'Number', required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  image: { type: 'String', required: true },
  stock: { type: 'Number', required: true },
  createdAt: { type: 'Date', default: Date.now },
  updatedAt: { type: 'Date', default: Date.now },
});

export const ProductModel = model<Product>('Product', ProductSchema);
