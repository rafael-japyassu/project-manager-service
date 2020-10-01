import IClientsRepository from '../repositories/IClientsRepository';
import Client from '../models/Client';
import IPaginated from '../interfaces/paginated';

interface IRequest {
  page: number;
}

class PaginatedClientsService {
  private clientRepository: IClientsRepository;

  constructor(clientRepository: IClientsRepository) {
    this.clientRepository = clientRepository;
  }

  public async execute({ page }: IRequest): Promise<IPaginated<Client>> {
    const [clients, total] = await this.clientRepository.findAllPaginated(
      page * 10,
    );

    const totalPages = Math.ceil(total / 10);

    const response: IPaginated<Client> = {
      data: clients,
      totalElements: total,
      page,
      elements: clients.length,
      elementsPerPage: 10,
      totalPages,
      firstPage: page === 0,
      lastPage: page === totalPages - 1,
    };

    return response;
  }
}

export default PaginatedClientsService;
