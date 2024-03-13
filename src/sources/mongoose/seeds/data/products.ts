import { faker } from '@faker-js/faker';

import { Product } from '../../models/product.model.js';

const products = (count: number, { categoryId }): Product[] =>
  Array.from({ length: count }, () => ({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: Number(faker.commerce.price()),
    category: categoryId,
    image: faker.image.imageUrl(),
    stock: faker.datatype.number(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

export default products;
