import ProjectStatus from '../enums/ProjectStatus';

export default interface ICreateProjectDTO {
  name: string;
  client_id: string;
  description: string;
  logo: string;
  status: ProjectStatus;
}
