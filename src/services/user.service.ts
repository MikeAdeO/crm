import { CompanyData, RegisterationRequestData } from "@/interfaces/user.interface";
import CompanyRepository from "@/repositories/company.repository";
import UserRepository from "@/repositories/user.repository";
import bcrypt from 'bcrypt';

class UserService {
    private readonly userRepo:UserRepository;
    private readonly companyRepo: CompanyRepository;
    constructor (
      
    ){
            this.userRepo = new UserRepository(),
            this.companyRepo = new CompanyRepository()
    }

    registeration = async (data:RegisterationRequestData) => {
            try {
                const user = await this.userRepo.findUser(data.user.email);

                if(user){
                    throw new Error('user exist!');
                }

              
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(data.user.password, saltRounds);

        
            const userData = { ...data.user, password: hashedPassword};
          const userResponse =  await this.userRepo.createUser(userData);
            const companyResponse =   await this.companyRepo.createCompany(data.company);

            await this.userRepo.createUserCompany({userId:userResponse.id, companyId:companyResponse.id})





            
            } catch (error:any) {
                throw new Error(error);
                
            }
    }

}

export default UserService;