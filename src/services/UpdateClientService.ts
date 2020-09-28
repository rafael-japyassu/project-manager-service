import IClientsRepository from '../repositories/IClientsRepository';
import Client from '../models/Client';
import AppError from '../errors/AppError';

interface IRequest {
  id: string;
  name: string;
  email: string;
  telephone: string;
  cpf: string;
}

class UpdateClientService {
  private clientRepository: IClientsRepository;

  constructor(clientRepository: IClientsRepository) {
    this.clientRepository = clientRepository;
  }

  public async execute({
    id,
    name,
    email,
    telephone,
    cpf,
  }: IRequest): Promise<Client> {
    const client = await this.clientRepository.findById(id);

    if (!client) {
      throw new AppError('Client not found!', 400);
    }

    if (email !== client.email) {
      const verifyEmail = this.clientRepository.findByEmail(email);

      if (verifyEmail) {
        throw new AppError('E-mail already used!', 400);
      }
    }

    client.name = name;
    client.email = email;
    client.telephone = telephone;
    client.cpf = cpf;

    await this.clientRepository.save(client);

    return client;
  }
}

export default UpdateClientService;
