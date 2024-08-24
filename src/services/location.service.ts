import LocationRepository from "@/repositories/location.repository";

class LocationService {
    private readonly locationRepo:LocationRepository
        constructor(){
                this.locationRepo =new LocationRepository()
        }

        fetchCountries = async() => {
            try {
                const countries =  await this.locationRepo.findManyCountries()
                

                return countries;
            } catch (error:any) {
                throw new Error(error);
            }
        }
        fetchCityCountries = async(countryId:number) => {
            try {
               
                const countries =  await this.locationRepo.findManyCityByCountry(Number(countryId))

                return countries;
            } catch (error:any) {
                throw new Error(error);
            }
        }
}

export default LocationService;