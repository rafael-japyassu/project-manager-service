import AppError from '../errors/AppError';
import IProjectsRepository from '../repositories/IProjectsRepository';
import Project from '../models/Project';

interface IRequest {
  id: string;
  logo: string;
}

class UploadLogoOfProjectService {
  private projectsRepository: IProjectsRepository;

  constructor(projectsRepository: IProjectsRepository) {
    this.projectsRepository = projectsRepository;
  }

  public async execute({ id, logo }: IRequest): Promise<Project> {
    const project = await this.projectsRepository.findById(id);

    if (!project) {
      throw new AppError('Project not found', 400);
    }

    project.logo = logo;

    await this.projectsRepository.save(project);

    return project;
  }
}

export default UploadLogoOfProjectService;
