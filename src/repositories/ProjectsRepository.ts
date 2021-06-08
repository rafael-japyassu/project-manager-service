import { Repository, getRepository } from 'typeorm';
import IProjectsRepository from './IProjectsRepository';
import ICreateProjectDTO from '../dtos/ICreateProjectDTO';
import Project from '../models/Project';

class ProjectsRepository implements IProjectsRepository {
  private ormRepository: Repository<Project>;

  constructor() {
    this.ormRepository = getRepository(Project);
  }

  public async findAll(): Promise<Project[]> {
    return this.ormRepository.find({
      relations: ['client'],
    });
  }

  public async findAllOfUser(user_id: string): Promise<Project[]> {
    return this.ormRepository.find({
      relations: ['client'],
      where: { user_id },
    });
  }

  public async findById(id: string): Promise<Project | undefined> {
    return this.ormRepository.findOne(id, {
      relations: ['client'],
    });
  }

  public async create({
    client_id,
    user_id,
    description,
    logo,
    name,
    status,
  }: ICreateProjectDTO): Promise<Project> {
    const project = this.ormRepository.create({
      client_id,
      user_id,
      description,
      logo,
      name,
      status,
    });

    await this.ormRepository.save(project);
    return project;
  }

  public async save(project: Project): Promise<Project> {
    return this.ormRepository.save(project);
  }
}

export default ProjectsRepository;
