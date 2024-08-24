import { RegisterationRequestData } from '@/interfaces/user.interface';
import bcrypt from 'bcrypt';
import UserRepository from '@/repositories/user.repository';
import CompanyRepository from '@/repositories/company.repository';
import LocationRepository from '@/repositories/location.repository';
import { JWT_SECRET } from '@/config/variable';
import jwt from 'jsonwebtoken';

class AuthService {
    private readonly userRepo: UserRepository;
    private readonly companyRepo: CompanyRepository;
    private readonly locationRepo: LocationRepository;

    constructor() {
        this.userRepo = new UserRepository();
        this.companyRepo = new CompanyRepository();
        this.locationRepo = new LocationRepository();
    }

    registration = async (data: RegisterationRequestData) => {
        const { user } = data;

        try {
         
               
                const countryExist = await this.locationRepo.findOneCountry(user.address.countryId);
                if (!countryExist) {
                    throw new Error('Country does not exist!');
                }

                const cityExist = await this.locationRepo.findOneCity(user.address.cityId, countryExist.id);
                if (!cityExist) {
                    throw new Error('City does not exist!');
                }

                const existingUser = await this.userRepo.findUser(user.email);
                if (existingUser) {
                    throw new Error('User already exists!');
                }

                const saltRounds = 10;
                const hashedPassword = await bcrypt.hash(user.password, saltRounds);


                const userResponse = await this.userRepo.createUser({ ...user, password: hashedPassword });
                const companyResponse = await this.companyRepo.createCompany(data.company);

          
                await this.userRepo.createUserCompany({
                    userId: userResponse.id,
                    companyId: companyResponse.id
                });

                //INTEGRATE A QUEUE TO SEND VERIFICATION CODE EMAIL

                return { user: userResponse, company: companyResponse };
          

    

        } catch (error: any) {
            throw new Error(`Registration failed: ${error.message}`);
        } 
    }


    login = async (email:string, password:string) => {
        try {
            const user =   await this.userRepo.findUserAuth(email)
            if(!user){
                throw new Error('user does not exist!');
            }

            if (!(await bcrypt.compare(password, user.password))) {
                throw new Error('Invalid credentials');
              }

              if (!JWT_SECRET) {
                throw new Error('Server configuration error');
              
              }

            //   if(user.emailVerified === false){

            //     //IMPLEMENT QUEUE TO SEND TO EMAIL
            //     throw new Error('Please verify your email, check your email for the OTP CODE');
            //   }

              return jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
        } catch (error:any) {
            throw new Error(error);
        }
    }
}

export default AuthService;
