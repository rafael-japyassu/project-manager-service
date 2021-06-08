import ProjectStatus from '../enums/ProjectStatus';

export default interface ICreateProjectDTO {
  name: string;
  user_id: string;
  client_id: string;
  description: string;
  logo?: string;
  status: ProjectStatus;
}
