var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const multer = require('../../middlewares/multer.middleware');
const cloudinary = require("../../utils/cloudinary")

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
    res.json({
      accessToken,
      user: {
        _id: user._id,
        email: user.email,
        image: user.image,
        firstName: user.firstName,
        lastName: user.lastName,
        birthDate: user.birthDate,
        address: user.address,
        phoneNumber: user.phoneNumber
      }
    });


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
    res.json({
      accessToken,
      user: {
        _id: newUser._id,
        email: newUser.email,
        image: newUser.image,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        birthDate: newUser.birthDate,
        address: newUser.address,
        phoneNumber: newUser.phoneNumber
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//update user by id
router.patch('/update/:id', multer.single('avatar'), async (req, res, next) => {
  const data = req.body;
  console.log(req.file);
  try {
    const user = await Users.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      user.image = result.secure_url;
    }

    if (data.password && data.password !== user.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.password, salt);
      user.password = hashedPassword;
    }

    if (data.email && data.email !== user.email) {
      const existingUser = await Users.findOne({ email: data.email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
      }
      user.email = data.email;
    }
    if (data.firstName) {
      user.firstName = data.firstName;
    }
    if (data.lastName) {
      user.lastName = data.lastName;
    }
    if (data.birthDate) {
      user.birthDate = data.birthDate;
    }
    if (data.address) {
      user.address = data.address;
    }
    if (data.phoneNumber) {
      user.phoneNumber = data.phoneNumber;
    }

    await user.save();

    res.json({
      user: {
        _id: user._id,
        email: user.email,
        image: user.image,
        firstName: user.firstName,
        lastName: user.lastName,
        birthDate: user.birthDate,
        address: user.address,
        phoneNumber: user.phoneNumber
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);

  }
})


// export router
module.exports = router;
