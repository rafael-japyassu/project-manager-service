import IProjectsRepository from '../repositories/IProjectsRepository';
import Project from '../models/Project';

class ListAllProjectsOfUserService {
  private projectsRepository: IProjectsRepository;

  constructor(projectsRepository: IProjectsRepository) {
    this.projectsRepository = projectsRepository;
  }

  public async execute(user_id: string): Promise<Project[]> {
    const projects = await this.projectsRepository.findAllOfUser(user_id);

    return projects;
  }
}

export default ListAllProjectsOfUserService;
