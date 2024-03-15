// Adapters
import { Database as MongooseDatabase, Resource as MongooseResource } from '@adminjs/mongoose';
import { dark, light, noSidebar } from '@adminjs/themes';

import AdminJS, { AdminJSOptions, ResourceOptions } from 'adminjs';
import argon2 from 'argon2';
import { AdminModel } from '../sources/mongoose/models/index.js';
import {
  CreateAdminResource,
  CreateCategoryResource,
  CreateUserResource,
  CreateProductResource,
  CreateCartResource,
  CreateOrderResource,
} from '../sources/mongoose/resources/index.js';
import './components.bundler.js';
import { AuthUsers } from './constants/authUsers.js';
import { locale } from './locale/index.js';
import { customTheme } from '../themes/index.js';

AdminJS.registerAdapter({ Database: MongooseDatabase, Resource: MongooseResource });

export const menu: Record<string, ResourceOptions['navigation']> = {
  mongoose: { name: 'Database', icon: 'Folder' },
};

export const generateAdminJSConfig: () => AdminJSOptions = () => ({
  version: { admin: true, app: '2.0.0' },
  rootPath: '/admin',
  locale,
  assets: {
    styles: ['/custom.css'],
    scripts: process.env.NODE_ENV === 'production' ? ['/gtm.js'] : [],
  },
  branding: {
    companyName: 'Database Admin',
    favicon: '/favicon.ico',
    theme: {
      colors: { primary100: '#4D70EB' },
    },
  },
  defaultTheme: 'light',
  availableThemes: [light, dark, noSidebar, customTheme],
  resources: [
    // mongoose
    CreateAdminResource(),
    CreateUserResource(),
    CreateProductResource(),
    CreateCategoryResource(),
    CreateCartResource(),
    CreateOrderResource(),
  ],
});

export const createAuthUsers = async () =>
  Promise.all(
    AuthUsers.map(async ({ email, password }) => {
      const admin = await AdminModel.findOne({ email });
      if (!admin) {
        await AdminModel.create({ email, password: await argon2.hash(password) });
      }
    }),
  );
