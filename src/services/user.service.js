/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
import User from '../models/user.model';
import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';

// Create New User
export const newUser = async (body) => {
  try {
    const { email, password } = body;

    // Check if email already exists
    const existUser = await User.findOne({ email });
    if (existUser) {
      return { message: 'Email already exists', success: false };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({ ...body, password: hashedPassword });

    return { message: 'User created successfully', success: true, user };
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

export const getUser = async () => {
  try {
    const allUsers = await User.find();
    return allUsers;
  } catch (error) {
    throw new Error(error.message);
  }
};

// User Login
export const loginUser = async (body) => {
  try {
    const { email, password } = body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return { message: 'Invalid email or password', success: false };
    }

    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { message: 'Invalid email or password', success: false };
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET_KEY, // Add your secret key in .env file
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    return { message: 'Login successful', success: true, token };
  } catch (error) {
    throw new Error(`Error logging in: ${error.message}`);
  }
};

// eslint-disable-next-line no-unused-vars
let recentOTP;
export const forgetPass = async ({ email }) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return { message: 'not found email' };
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    recentOTP = otp;
    return { message: 'otp generated', otp };
  } catch (error) {
    return { error: error.message };
  }
};

export const resetPassword = async ({ email, otp, newPassword }) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return { message: 'Email not found' };
    }

    if (recentOTP !== parseInt(otp)) {
      return { isValid: false, message: 'Invalid OTP' };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    let data = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );

    recentOTP=null;
    return data;

    // if(recentOTP!==null)
    // {
    //   recentOTP=null;
    //   return data;
    // }
    // else{
    //   return { isValid: false,message: 'Invalid or expired OTP'};
    // }
  } catch (error) {
    return { error: error.message };
  }
};
