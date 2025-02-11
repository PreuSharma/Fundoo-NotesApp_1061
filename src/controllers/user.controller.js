import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

export const registerUser = async (req, res) => {
  try {
    let data = await UserService.newUser(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'New User Created Successfully'
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    let data = await UserService.getUser(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All Users Fetched Successfully'
    });
  } catch (error) {
    console.log(error);
  }
};

export const loginUsers = async (req, res) => {
  try {
    let data = await UserService.loginUser(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All user fetched'
    });
  } catch (error) {
    console.log(error);
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: 'Error in login'
    });
  }
};
