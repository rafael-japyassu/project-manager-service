import { Router } from 'express';
import UserController from '../controllers/UserController';
import authenticate from '../middlewares/auth';

const userRoutes = Router();
const userController = new UserController();

userRoutes.post('/', userController.create);
userRoutes.patch('/:id', authenticate, userController.enable);

export default userRoutes;
