import { Router } from 'express';
import authenticate from '../middlewares/auth';
import ProjetcsController from '../controllers/ProjectsController';

const projectRoutes = Router();
const projectController = new ProjetcsController();

projectRoutes.use(authenticate);

projectRoutes.get('/', projectController.index);
projectRoutes.get('/:id', projectController.show);
projectRoutes.post('/', projectController.create);
projectRoutes.put('/:id', projectController.update);
projectRoutes.patch('/:id', projectController.changeStatus);

export default projectRoutes;
