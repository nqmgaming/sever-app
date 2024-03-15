import express from 'express';
import mongoose from 'mongoose';
const router = express.Router();

router.get('/hello', async (req, res) => {
  res.send('Hello World!');
});

export default router;
