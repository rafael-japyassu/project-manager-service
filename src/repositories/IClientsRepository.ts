import Client from '../models/Client';
import ICreateClientDTO from '../dtos/ICreateClientDTO';

export default interface IClientsRepository {
  findAll(): Promise<Client[]>;
  findById(id: string): Promise<Client | undefined>;
  findByEmail(email: string): Promise<Client | undefined>;
  create(createClientDTO: ICreateClientDTO): Promise<Client>;
  save(client: Client): Promise<Client>;
}
