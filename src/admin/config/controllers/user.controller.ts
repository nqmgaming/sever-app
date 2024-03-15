import express from 'express';

const userAPI = express.Router();
import { UserModel } from '../../../sources/mongoose/models/index.js';
import { User } from '../../../sources/mongoose/models/user.model.js';

// API router for user

// sign up
userAPI.post('/signup', async (req, res) => {
  try {
    const userData: User = {
      image: req.body.image || '',
      password: req.body.password || '',
      email: req.body.email || '',
      firstName: req.body.firstName || '',
      lastName: req.body.lastName || '',
      birthDate: req.body.birthDate || new Date(),
      address: req.body.address || '',
      phoneNumber: req.body.phoneNumber || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const user = new UserModel(userData);
    const result = await user.save();

    if (!result) {
      throw new Error('Error saving user');
    } else {
      res.json(userData);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
export default userAPI;
