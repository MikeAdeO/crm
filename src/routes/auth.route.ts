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
     /**
     * @swagger
     * tags:
     *   name: Authentication
     *   description: User authentication routes
     */

    /**
     * @swagger
     * /api/auth/register:
     *   post:
     *     summary: Register a new user and company
     *     tags: [Authentication]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               user:
     *                 type: object
     *                 properties:
     *                   email:
     *                     type: string
     *                     format: email
     *                   password:
     *                     type: string
     *                     format: password
     *                   confirm_password:
     *                     type: string
     *                     format: password
     *                     description: Must match the password
     *                   firstName:
     *                     type: string
     *                   lastName:
     *                     type: string
     *                   title:
     *                     type: string
     *                   address:
     *                     type: object
     *                     properties:
     *                       address:
     *                         type: string
     *                       cityId:
     *                         type: integer
     *                       countryId:
     *                         type: integer
     *               company:
     *                 type: object
     *                 properties:
     *                   name:
     *                     type: string
     *                   email:
     *                     type: string
     *                     format: email
     *                   details:
     *                     type: object
     *                     properties:
     *                       website:
     *                         type: string
     *                         format: uri
     *                       industry:
     *                         type: string
     *                       foundingYear:
     *                         type: string
     *                       revenue:
     *                         type: integer
     *                       grossProfit:
     *                         type: integer
     *                       previousYearGrossProfit:
     *                         type: integer
     *                       ebitda:
     *                         type: integer
     *                       ebitdaPreviousYear:
     *                         type: integer
     *                   teams:
     *                     type: array
     *                     items:
     *                       type: object
     *                       properties:
     *                         fullName:
     *                           type: string
     *                         roleId:
     *                           type: integer
     *     responses:
     *       201:
     *         description: User and company registered successfully
     *       400:
     *         description: Bad request
     */
    
    this.router.post('/register', this.userController.registeration);

    
    /**
     * @swagger
     * /api/auth/login:
     *   post:
     *     summary: Login a user
     *     tags: [Authentication]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *             example:
     *               email: "user@example.com"
     *               password: "password123"
     *     responses:
     *       200:
     *         description: User logged in successfully
     *       401:
     *         description: Unauthorized
     */
    this.router.post('/login', this.userController.login);

  }

  public getRouter(): Router {
    return this.router;
  }
}






