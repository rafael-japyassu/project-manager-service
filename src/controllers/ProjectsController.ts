import { Request, Response } from 'express';
import ClientRepository from '../repositories/ClientRepository';
import ProjectsRepository from '../repositories/ProjectsRepository';
import CreateProjectService from '../services/CreateProjectService';
import ListallProjectsService from '../services/ListAllProjectService';
import UpdateProjectService from '../services/UpdateProjectService';
import ShowProjectService from '../services/ShowProjectService';
import UpdateProjectStatusService from '../services/UpdateProjectStatusService';

class ProjetcsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const projectsRepository = new ProjectsRepository();
    const projectsService = new ListallProjectsService(projectsRepository);

    const projects = await projectsService.execute();

    return response.json(projects);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const projectsRepository = new ProjectsRepository();
    const projectsService = new ShowProjectService(projectsRepository);

    const project = await projectsService.execute(id);

    return response.json(project);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, client_id, description, logo } = request.body;
    const projectsRepository = new ProjectsRepository();
    const clientRepository = new ClientRepository();
    const createProject = new CreateProjectService(
      projectsRepository,
      clientRepository,
    );

    const project = await createProject.execute({
      name,
      client_id,
      description,
      logo,
    });

    return response.status(201).json(project);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, client_id, description, logo } = request.body;
    const projectsRepository = new ProjectsRepository();
    const clientRepository = new ClientRepository();
    const updateProject = new UpdateProjectService(
      projectsRepository,
      clientRepository,
    );

    const project = await updateProject.execute({
      id,
      name,
      client_id,
      description,
      logo,
    });

    return response.json(project);
  }

  public async changeStatus(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const { status } = request.body;
    const projectsRepository = new ProjectsRepository();
    const updateProject = new UpdateProjectStatusService(projectsRepository);

    const project = await updateProject.execute({
      id,
      status,
    });

    return response.json(project);
  }
}

export default ProjetcsController;
