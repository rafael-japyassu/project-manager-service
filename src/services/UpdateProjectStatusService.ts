import AppError from '../errors/AppError';
import IProjectsRepository from '../repositories/IProjectsRepository';
import Project from '../models/Project';
import ProjectStatus from '../enums/ProjectStatus';

interface IRequest {
  id: string;
  status: ProjectStatus;
}

class UpdateProjectStatusService {
  private projectsRepository: IProjectsRepository;

  constructor(projectsRepository: IProjectsRepository) {
    this.projectsRepository = projectsRepository;
  }

  public async execute({ id, status }: IRequest): Promise<Project> {
    const project = await this.projectsRepository.findById(id);

    if (!project) {
      throw new AppError('Project not found', 400);
    }

    project.status = status;

    await this.projectsRepository.save(project);

    return project;
  }
}

export default UpdateProjectStatusService;
