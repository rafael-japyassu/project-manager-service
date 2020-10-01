import IClientsRepository from '../repositories/IClientsRepository';
import AppError from '../errors/AppError';

class DeleteClientService {
  private clientRepository: IClientsRepository;

  constructor(clientRepository: IClientsRepository) {
    this.clientRepository = clientRepository;
  }

  public async execute(id: string): Promise<void> {
    const client = await this.clientRepository.findById(id);

    if (!client) {
      throw new AppError('Client not found!', 400);
    }

    await this.clientRepository.delete(id);
  }
}

export default DeleteClientService;
