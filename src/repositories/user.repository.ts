import { UserAddressInterface, UserInterfaceRequest} from "@/interfaces/user.interface";
import prisma from "@/utils/prisma.utils";

class UserRepository {
    createUser = async (data: UserInterfaceRequest) => {
        try {

            const {address, password, firstName, lastName, title, email } = data;
            const response = await prisma.user.create({ 
                data: {

                    password, firstName, lastName, title, email,
                    address: address 
                    ? {
                        create: {
                            ...address
                        }
                    }
                    : undefined

                }
             });

            return response;
        } catch (error: any) {
            throw new Error(error.message);

        }
    }

    createUserCompany = async (data:{userId:number, companyId:number}) => {
        try {
            const response = await prisma.companyUser.create({data})

            return response;
        } catch (error: any) {
            throw new Error(error.message);

        }
    }

    findUser = async (email:string) => {
        try {
            const response = await prisma.user.findUnique({
                where: { email: email},
                select: {
                    id: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                    title: true
                }
            });

            return response;
        } catch (error: any) {
            throw new Error(`Failed to find user: ${error.message}`);
        }
    }

    createUserAddress = async (data:UserAddressInterface)  => {
        try {
            const response = await prisma.userAddress.create({data});

            return response;
        } catch (error:any) {
            throw new Error(`Failed to find user: ${error.message}`);
        }
    }
}
export default UserRepository;