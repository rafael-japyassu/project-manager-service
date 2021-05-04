import IProjectsRepository from '../repositories/IProjectsRepository';
import Project from '../models/Project';

class ListallProjectsService {
  private projectsRepository: IProjectsRepository;

  constructor(projectsRepository: IProjectsRepository) {
    this.projectsRepository = projectsRepository;
  }

  public async execute(): Promise<Project[]> {
    const projects = await this.projectsRepository.findAll();

    return projects;
  }
}

export default ListallProjectsService;
