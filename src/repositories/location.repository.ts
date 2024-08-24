import { cityInterface, countryInterface } from "@/interfaces/location.interface";
import prisma from "@/utils/prisma.utils"

class LocationRepository {
     findOneCountry = async (id: number): Promise<countryInterface | null> => {
        try {
            // Find the country
            const country = await prisma.country.findFirst({
                where: { id },
            });
    
            
            if (country) {
                return {
                    id: country.id,
                    status: country.status,
                    symbol: country.symbol || undefined,
                    name: country.name,
                };
            }
    
            // Return null if not found
            return null;
    
        } catch (error) {
            // Throw a new error if an exception occurs
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('An unknown error occurred');
            }
        }
    }
    findOneCity = async (id:number, countryId:number) :Promise <cityInterface | null>=> {
        try {
            const response = await prisma.city.findFirst({
                where:{
                    id:id,
                    countryId: countryId
                }
            });

            return response;


        } catch (error:any) {
            throw new Error(error.message);
        }
    }
}

export default LocationRepository;