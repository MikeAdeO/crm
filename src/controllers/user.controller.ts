import { RegisterationRequestData } from "@/interfaces/user.interface";
import AuthService from "@/services/auth.service";
import LoginSchema from "@/validations/login.validation";
import registrationSchema from "@/validations/registeration.validation";
import { Request, Response } from 'express';
class UserController {
    private readonly authService: AuthService;
    constructor(

    ) {
        this.authService = new AuthService()
    }

    registeration = async (req: any, res: Response) => {
        try {

            const { error } = registrationSchema.validate(req.body);
            if (error) {
                throw new Error(`Validation error: ${error.details[0].message}`);
            }





            const response = await this.authService.registration(req.body);
            return res.status(201).json({
                success: true,
                message: "Account created, please verify",

            });
        } catch (error: any) {
            res.status(400).json({ message: error.message, success: false });
        }
    }
    login = async (req: any, res: Response) => {
        try {

            const { error } = LoginSchema.validate(req.body);
            if (error) {
                throw new Error(`Validation error: ${error.details[0].message}`);
            }
            const { email, password } = req.body;




            const response = await this.authService.login(email, password);
            return res.status(200).json({
                success: true,
                data: response

            });
        } catch (error: any) {
            res.status(400).json({ message: error.message, success: false });
        }
    }
}

export default UserController;