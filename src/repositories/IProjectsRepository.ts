import Project from '../models/Project';
import ICreateProjectDTO from '../dtos/ICreateProjectDTO';

export default interface IProjectsRepository {
  findAll(): Promise<Project[]>;
  findAllOfUser(user_id: string): Promise<Project[]>;
  findById(id: string): Promise<Project | undefined>;
  create(createProject: ICreateProjectDTO): Promise<Project>;
  save(project: Project): Promise<Project>;
}
