import { Request, Response } from 'express';
import ClientRepository from '../repositories/ClientRepository';
import CreateClientService from '../services/CreateClientService';
import UpdateClientService from '../services/UpdateClientService';
import PaginatedClientsService from '../services/PaginatedClientsService';
import DeleteClientService from '../services/DeleteClientService';

class ClientController {
  public async index(request: Request, response: Response): Promise<Response> {
    const clientRepository = new ClientRepository();

    const clients = await clientRepository.findAll();

    return response.json(clients);
  }

  public async paginated(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { page } = request.query;
    const clientRepository = new ClientRepository();
    const clientsPaginated = new PaginatedClientsService(clientRepository);
    const clients = await clientsPaginated.execute({
      page: page !== undefined ? parseInt(page.toString(), 10) : 0,
    });

    return response.json(clients);
  }

  public async search(request: Request, response: Response): Promise<Response> {
    const { name } = request.query;
    const clientRepository = new ClientRepository();

    const clients = await clientRepository.finAllByName(name?.toString() || '');

    return response.json(clients);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, telephone, cpf } = request.body;
    const clientRepository = new ClientRepository();
    const createClient = new CreateClientService(clientRepository);

    const client = await createClient.execute({
      name,
      email,
      telephone,
      cpf,
    });

    return response.status(201).json(client);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, telephone, cpf } = request.body;
    const clientRepository = new ClientRepository();
    const updateClient = new UpdateClientService(clientRepository);

    const client = await updateClient.execute({
      id,
      name,
      email,
      telephone,
      cpf,
    });

    return response.json(client);
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const clientRepository = new ClientRepository();
    const destroyClient = new DeleteClientService(clientRepository);

    await destroyClient.execute(id);

    return response.status(204).send();
  }
}

export default ClientController;
