import { Request, Response } from 'express';
import SessionService from '../services/SessionService';
import UserRepository from '../repositories/UserRepository';

class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const userRespository = new UserRepository();
    const createSesison = new SessionService(userRespository);

    const session = await createSesison.execute({
      email,
      password,
    });

    return response.json(session);
  }
}

export default SessionController;
