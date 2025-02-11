import express from 'express';
import * as userController from '../controllers/user.controller';
import { registerValidator } from '../validators/user.validator';
// import { userAuth } from '../middlewares/auth.middleware';
const router = express.Router();

router.get('', userController.getAllUsers);
router.post('/', registerValidator, userController.registerUser);
export default router;
