import { faker } from '@faker-js/faker';

import { Category } from '../../models/category.model.js';

const categories = (count: number, { userId }): Category[] =>
  Array.from({ length: count }, () => ({
    name: faker.commerce.department(),
    description: faker.commerce.productDescription(),
    createdBy: userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

export default categories;
