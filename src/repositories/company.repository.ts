import { CompanyData } from "@/interfaces/user.interface";
import prisma from "@/utils/prisma.utils";

class CompanyRepository {
    createCompany = async (data: CompanyData) => {
        try {


            const { name, email, details, teams } = data;

            const response = await prisma.company.create({
                data: {
                    name,
                    reference: (Math.random() + 1).toString(36).substring(5),
                    email,
                    details: details
                        ? {
                            create: {
                                ...details,
                            },
                        }
                        : undefined,
                    teams: teams?.length
                        ? {
                            create: teams.map((team) => ({
                                fullName: team.fullName,
                                roleId: team.roleId,
                            })),
                        }
                        : undefined,
                },
                include: {
                    details: true,
                    teams: true,
                },
            });

            return response;
        } catch (error: any) {
            throw new Error(error.message);

        }
    }





}

export default CompanyRepository;