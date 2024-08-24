import LocationController from '@/controllers/location.controller';
import { Router } from 'express';

export class LocationRouter {
  private readonly router: Router;
  private readonly locationController: LocationController;

  constructor() {
    this.router = Router();
    this.locationController = new LocationController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @swagger
     * tags:
     *   name: Location
     *   description: Fetching Countries & Cities
     */

    /**
     * @swagger
     * /api/location/countries:
     *   get:
     *     summary: Fetch list of countries
     *     tags: [Location]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: List of countries fetched successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: integer
     *                   name:
     *                     type: string
     *       400:
     *         description: Bad request
     *       401:
     *         description: Unauthorized
     */
    this.router.get('/countries', this.locationController.fetchCountries);

    /**
     * @swagger
     * /api/location/city/{countryId}:
     *   get:
     *     summary: Fetch list of cities by country ID
     *     tags: [Location]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: countryId
     *         schema:
     *           type: integer
     *         required: true
     *         description: The ID of the country to fetch cities for
     *     responses:
     *       200:
     *         description: List of cities fetched successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: integer
     *                   name:
     *                     type: string
     *       400:
     *         description: Bad request
     *       401:
     *         description: Unauthorized
     */
    this.router.get('/city/:countryId', this.locationController.fetchCityCountries);
  }

  public getRouter(): Router {
    return this.router;
  }
}
