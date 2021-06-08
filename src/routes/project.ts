import { Router } from 'express';
import multer from 'multer';
import authenticate from '../middlewares/auth';
import ProjetcsController from '../controllers/ProjectsController';
import multerConfig from '../config/multer';

const projectRoutes = Router();
const projectController = new ProjetcsController();

projectRoutes.use(authenticate);

projectRoutes.get('/users/:user_id', projectController.index);
projectRoutes.get('/:id', projectController.show);
projectRoutes.post(
  '/',
  multer(multerConfig).single('logo'),
  projectController.create,
);
projectRoutes.put(
  '/:id/upload',
  multer(multerConfig).single('logo'),
  projectController.uploadLogo,
);
projectRoutes.put('/:id', projectController.update);
projectRoutes.patch('/:id', projectController.changeStatus);

export default projectRoutes;
