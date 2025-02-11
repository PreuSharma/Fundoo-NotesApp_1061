import User from '../models/user.model';
import bcrypt from 'bcrypt';

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

    return { message: 'Login successful', success: true, user };
  } catch (error) {
    throw new Error(`Error logging in: ${error.message}`);
  }
};
