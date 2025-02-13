/* eslint-disable no-trailing-spaces */
import express from 'express';
import * as userController from '../controllers/user.controller';
import { registerValidator } from '../validators/user.validator';
// eslint-disable-next-line prettier/prettier
import { userAuth } from '../middlewares/auth.middleware'; 

// import { userAuth } from '../middlewares/auth.middleware';
const router = express.Router();

router.post('/register', registerValidator, userController.registerUser);
router.get('/getAllUsers', userAuth, userController.getAllUsers);
router.post('/login', userController.loginUsers);
router.post('/forget', userController.forgetPass);
router.put('/reset', userController.resetPassword);

export default router;
