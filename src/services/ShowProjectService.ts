import AppError from '../errors/AppError';
import IProjectsRepository from '../repositories/IProjectsRepository';
import Project from '../models/Project';

class ShowProjectService {
  private projectsRepository: IProjectsRepository;

  constructor(projectsRepository: IProjectsRepository) {
    this.projectsRepository = projectsRepository;
  }

  public async execute(id: string): Promise<Project> {
    const project = await this.projectsRepository.findById(id);

    if (!project) {
      throw new AppError('Project not found', 400);
    }

    return project;
  }
}

export default ShowProjectService;
