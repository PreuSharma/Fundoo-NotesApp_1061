import User from '../models/user.model';

export const newUser = async (body) => {
  const { email } = body;
  const existUser = await User.findOne({ email });
  if (existUser) {
    return 'Email already exit';
  } else {
    let user = User.create(body);
    return user;
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
