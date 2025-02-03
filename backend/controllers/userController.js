const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Token = require('../models/tokenModel');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail'); // Nodemailer
require('dotenv').config();

//const sendEmail = require("../services/sendEmail");
const sendGridEmail = require('../services/sendGridEmail');

//Generate jwt token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// Register user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  // Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please fill in all required fields');
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error('Password must be at least 6 characters');
  }
  // Check if email already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('Email already registered');
  }

  // validating email
  if (role === 'admin') {
    const emailDomain = email.split('@')[1];
    if (emailDomain !== 'university.edu') {
      return res
        .status(400)
        .json({ message: 'You must register with a valid staff email.' });
    }
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role: role || 'user', // Default role if not provided
  });

  // Generate token
  const token = generateToken(user._id);

  // Send cookie
  res.cookie('token', token, {
    path: '/',
    httpOnly: true,
  
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });

  if (user) {
    const { _id, name, email, phone, bio, photo, role } = user;
    res.status(201).json({
      _id,
      name,
      email,
      phone,
      bio,
      photo,
      role,
      token,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

//Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Request received:', { email, password });

    // Validate Request
    if (!email || !password) {
      res.status(400).json({ message: 'Please add email and password' });
      return;
    }

    // Check if user exists
    const user = await User.findOne({ email }).exec();
    if (!user) {
      console.log('User not found:', email);
      res.status(400).json({ message: 'User not found, please signup' });
      return;
    }

    console.log('User found:', user);

    // Check if password is correct
    const passwordIsCorrect = await bcrypt.compare(password, user.password);
    console.log('Password is correct:', passwordIsCorrect);

    if (!passwordIsCorrect) {
      res.status(400).json({ message: 'Invalid email or password' });
      return;
    }

    // Generate token
    const token = generateToken(user._id);

    // Send HTTP-only cookie
    res.cookie('token', token, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === "production",
    });

    // Get user info
    const { _id, name, email: userEmail, phone, bio, photo, role } = user;
    res.status(200).json({
      _id,
      name,
      email: userEmail,
      phone,
      bio,
      photo,
      role,
      token,
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//Logout user
const logout = asyncHandler(async (req, res) => {
  // res.send('Logout user')

  // Clear the token cookie
  res.cookie('token', '', {
    path: '/',
    httpOnly: true,
    expires: new Date(0),
    sameSite: 'strict',
    secure: false,
  });
  //return res.send(200).json({ message: "Succesfully Logged out" });
  // Return success response
  res.status(200).json({ message: 'Successfully Logged out' });
});

//Get user profile/data
const getUser = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'You are not logged in' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode token


    const userId = decoded.id; // Extract userId from token

    const userProfile = await User.findById(userId);

    if (!userProfile) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { _id, name, photo, email, phone, bio, role } = userProfile;

    res.status(200).json({ _id, name, email, photo, phone, bio, role });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid token or user not found' });
  }
};


//Get students profile/data
const getStudents = asyncHandler(async (req, res) => {
  //res.send('Get User Data')
  const users = await User.find({ role: 'user' });

  if (users) {
    res.status(200).json({
      users,
    });
  } else {
    res.status(400);
    throw new Error('User not Found');
  }
});

//Get login status
const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json(false);
  }

  //Verify token
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (verified) {
    return res.json(true);
  }
  return res.json(false);
  //res.send('Login status')
});

//Update user
const updateUser = asyncHandler(async (req, res) => {
  //res.send('User updated')
  const user = await User.findById(req.user._id);

  if (user) {
    const { name, email, phone, bio, photo } = user;
    user.email = email;
    user.name = req.body.name || name;
    user.phone = req.body.phone || phone;
    user.bio = req.body.bio || bio;
    user.photo = req.body.photo || photo;

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      bio: updatedUser.bio,
      photo: updatedUser.photo,
    });
  } else {
    res.status(404);
    throw new Error('User not Found');
  }
});

//Change password
const changePassword = asyncHandler(async (req, res) => {
  // res.send('Password Changed')

  const user = await User.findById(req.user._id);

  const { oldPassword, password } = req.body;

  if (!user) {
    res.status(400);
    throw new Error('User not Found, please signup');
  }
  //Validate
  if (!oldPassword || !password) {
    res.status(404);
    throw new Error('Please add old and new password');
  }

  //Check if password matches password in DB
  const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);
  console.log(
    'Comparing provided password with hashed password:',
    password,
    user.password
  );

  //Save new password
  if (user && passwordIsCorrect) {
    user.password = password;
    await user.save();
    res.status(200).send('Password changed succesfully');
  } else {
    res.status(400);
    throw new Error('Old password is incorrect');
  }
});

//Forgot password

const forgotPassword = asyncHandler(async (req, res) => {
  //res.send("Forgot Password");
  const { email } = req.body;
  const user = await User.findOne({ email });
  console.log('User found:', user ? user.email : 'No user found');

  if (!user) {
    res.status(404);
    throw new Error('User does not exist');
  }

  //Delete Token if it exists in DB
  let token = await Token.findOne({ userId: user._id });
  if (token) {
    await token.deleteOne();
  }

  //Create a reset Token
  let resetToken = crypto.randomBytes(32).toString('hex') + user._id;
  console.log(resetToken);

  //Hash token before saving to DB
  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  //console.log(hashedToken)

  //Save Token to DB
  await new Token({
    userId: user._id,
    token: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 30 * (60 * 1000), //30 mins
  }).save();

  //Construct Reset Url
  const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

  // Plain text email content
  //   const text = `Hello ${user.name},

  // Please use the following link to reset your password:
  // ${resetUrl}

  // This link is valid for 30 minutes.

  // Regards,
  // Your Company`;

  //Reset Email
  const message = `
<h2>Hello ${user.name}</h2>
<p>Please use the url below to reset your password</p>
<p>Please reset link is valid for only 30 minutes</p>

<a href=${resetUrl} clicktracking=off> ${resetUrl}</a>

<p>Regards...</p>

<p>Project App</p>
`;

  const subject = 'Password Reset Request';
  const send_to = user.email;
  const sent_from = process.env.EMAIL_USER;

  //res.send('Forgot pass')
  try {
    // Using SendGrid to send the email
    await sendGridEmail(send_to, subject, message, message); // SendGrid email service
    // Or use Nodemailer
    // await sendEmail(subject, message, send_to, sent_from); // Nodemailer email service

    res.status(200).json({ success: true, message: 'Reset Email Sent' });
  } catch (error) {
    res.status(500);
    throw new Error('Email not sent, please try again');
  }
});

//Reset Password
// Reset Password
const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { resetToken } = req.params;

  // Hash token, then compare to the one in DB
  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Find token in DB
  const userToken = await Token.findOne({
    token: hashedToken,
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    res.status(404);
    throw new Error('Invalid or Expired Token');
  }

  // Find user
  const user = await User.findOne({ _id: userToken.userId });
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Update user password
  user.password = await bcrypt.hash(password, 10);
  await user.save();

  // Delete the used token
  await userToken.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Password reset successful, please log in',
  });
});

module.exports = {
  registerUser,
  loginUser,
  logout,
  getUser,
  loginStatus,
  updateUser,
  changePassword,
  forgotPassword,
  resetPassword,
  getStudents,
};
