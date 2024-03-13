import { faker } from '@faker-js/faker';

import { User, Gender } from '../../models/user.model.js';

const users = (count: number): User[] =>
  Array.from({ length: count }, () => ({
    image: faker.image.avatar(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    fullName: faker.name.findName(),
    address: faker.address.streetAddress(),
    phoneNumber: faker.phone.phoneNumber(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

export default users;
