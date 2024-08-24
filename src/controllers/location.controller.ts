import LocationService from "@/services/location.service";
import { Response } from 'express';
class LocationController {
    private readonly locationService:LocationService;

    constructor(){
        this.locationService = new LocationService()
    }

    fetchCountries = async (req:any, res:Response) => {
        try {
            const result = await this.locationService.fetchCountries()
            return res.status(200).json({
                success: true,
                data: result

            });
        } catch (error:any) {
            res.status(400).json({ message: error.message, success: false });
        }
    }
    fetchCityCountries = async (req:any, res:Response) => {
        try {
            const {countryId} = req.params;
            const response = await this.locationService.fetchCityCountries(countryId)
            return res.status(200).json({
                success: true,
                data: response

            });
        } catch (error:any) {
            res.status(400).json({ message: error.message, success: false });
        }
    }
}

export default LocationController;