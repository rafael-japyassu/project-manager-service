import AppError from '../errors/AppError';
import IProjectsRepository from '../repositories/IProjectsRepository';
import Project from '../models/Project';
import IClientsRepository from '../repositories/IClientsRepository';
import ProjectStatus from '../enums/ProjectStatus';

interface IRequest {
  name: string;
  logo?: string;
  description: string;
  client_id: string;
  user_id: string;
}

class CreateProjectService {
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
    name,
    client_id,
    description,
    logo,
    user_id,
  }: IRequest): Promise<Project> {
    const verifyClient = await this.clientRepository.findById(client_id);

    if (!verifyClient) {
      throw new AppError('Client not found', 400);
    }

    const project = await this.projectsRepository.create({
      name,
      client_id,
      description,
      logo,
      status: ProjectStatus.NEW,
      user_id,
    });

    return project;
  }
}

export default CreateProjectService;
