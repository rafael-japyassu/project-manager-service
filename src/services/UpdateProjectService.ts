import AppError from '../errors/AppError';
import IProjectsRepository from '../repositories/IProjectsRepository';
import Project from '../models/Project';
import IClientsRepository from '../repositories/IClientsRepository';

interface IRequest {
  id: string;
  name: string;
  logo: string;
  description: string;
  client_id: string;
}

class UpdateProjectService {
  private projectsRepository: IProjectsRepository;

  private clientRepository: IClientsRepository;

  constructor(
    projectsRepository: IProjectsRepository,
    clientRepository: IClientsRepository,
  ) {
    this.projectsRepository = projectsRepository;
    this.clientRepository = clientRepository;
  }

  public async execute({
    id,
    name,
    client_id,
    description,
    logo,
  }: IRequest): Promise<Project> {
    const project = await this.projectsRepository.findById(id);

    if (!project) {
      throw new AppError('Project not found', 400);
    }

    const verifyClient = await this.clientRepository.findById(client_id);

    if (!verifyClient) {
      throw new AppError('Client not found', 400);
    }

    project.name = name;
    project.client_id = client_id;
    project.description = description;
    project.logo = logo;

    await this.projectsRepository.save(project);

    return project;
  }
}

export default UpdateProjectService;
