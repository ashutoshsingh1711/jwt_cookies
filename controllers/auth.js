const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Signup route handler
exports.signup = async (req, res) => {
  try {
    // Get data from the request body
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email is already taken',
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Save the user to the database
    await newUser.save();
    
  //   const user = await User.create({
  //     name,email,password:hashedPassword,role
  // })

    // Send success response
    return res.status(200).json({
      success: true,
      message: 'User created successfully',
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: 'Failed to register user. Please try again later.',
    });
  }
};

// Login route handler
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      // Check if email and password are provided
      return res.status(400).json({
        success: false,
        message: 'Please enter both email and password',
      });
    }

    let userExist = await User.findOne({ email });
    if (!userExist) {
      // Check if the user exists
      return res.status(403).json({
        success: false,
        message: 'User does not exist',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, userExist.password);
    if (isPasswordValid) {
      // If password is valid, generate a token and prepare the response
      const payload = {
        email: userExist.email,
        id: userExist._id,
        role: userExist.role,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });

      // Convert the userExist document to a plain JavaScript object
      userExist = userExist.toObject();
      userExist.token = token;
      userExist.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      };

      const user = {
        _id: userExist._id,
        name: userExist.name,
        email: userExist.email,
        role: userExist.role,
      };

      // Set the token in a cookie and send the response
      res.cookie('token', token, options).status(200).json({
        success: true,
        token,
        userExist,
        message: 'User logged in successfully',
      });
    } else {
      // If password is incorrect, return an error message
      res.status(403).json({
        success: false,
        message: 'Password incorrect',
      });
    }
  } catch (error) {
    // Handle any errors that occur during the login process
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Failed to login, please try again',
    });
  }
};


