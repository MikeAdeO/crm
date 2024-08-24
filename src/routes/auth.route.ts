import UserController from '@/controllers/user.controller';
import { Router } from 'express';




export class AuthRouter {
  private readonly router: Router;
  private readonly  userController :UserController

  constructor() {
    this.router = Router();
    this.userController = new UserController()
    this.initializeRoutes();
  }

  private initializeRoutes() {
    
    this.router.post('/register', this.userController.registeration);
    this.router.post('/login', this.userController.login);

  }

  public getRouter(): Router {
    return this.router;
  }
}
