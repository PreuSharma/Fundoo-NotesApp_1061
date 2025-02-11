import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';
import jwt from 'jsonwebtoken';

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
    if (!data.success) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: data.message
      });
    }
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: { token: data.token, user: data.user },
      message: 'Login successful 2'
    });
  } catch (error) {
    console.log(error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Error occurred during login.'
    });
  }
};
