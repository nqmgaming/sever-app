var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const Users = require('../../models/user.model');

// check user exists
router.get('/check/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const user = await Users
      .findOne({ email })
      .select('-password');
    if (user) {
      res.json(true);
      console.log(user);
    } else {
      res.json(false);
      console.log("email not found: " + email);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//sign in
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Tạo và trả về access token cho người dùng
    const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
    res.json({ accessToken });


  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//sign up
router.post('/signup', async (req, res) => {
  try {
    const { email, password, image, firstName, lastName, birthDate, address, phoneNumber } = req.body;

    // Check if the email already exists in the database
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new Users({
      email,
      password: hashedPassword,
      image,
      firstName,
      lastName,
      birthDate,
      address,
      phoneNumber,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Save the user to the database
    await newUser.save();


    // Generate and return an access token for the user
    const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
    res.json({ accessToken });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// export router
module.exports = router;
