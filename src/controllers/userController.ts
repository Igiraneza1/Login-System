import { Response, Request } from "express";
import { Database } from '../database/';
import { hashPassword, isPasswordMatch, generateToken } from '../utils/helper';
import { ResponseService } from "../utils/response";
import { AuthRequest } from "../middleware/authMiddleware";
import { CreateUserRequest, LoginUserRequest, UserControllerImplementation } from "../types/userInterface";

export class UserController implements UserControllerImplementation{
    // Register new user
    public async createUser(req: CreateUserRequest, res: Response){
        try{
            const{email, password, name} = req.body;
            const userExist = await DatabaseError.User.findOne({
                where: {email}
            });
            if (userExist){
                return ResponseService({
                    res,
                    data: null,
                    status: 400,
                    message: "User alread exists"
                });
            }
            
            const user = await Database.User.create({
                email,
                password: awiat hashPassword (password),
                name,
                role: 'user'
            });
            return ResponseService({
                res,
                data: user?.dataValues,
                status: 201
                message: "user created successfull"
            });
        }
        catch(error){
            const {message, stack} = error as Error;
            return ResponseService({
                res,
                data: stack,
                message,
                status: 500,
                success: false
            })
        }
    }

    // Get authenticated user

    public async getAllUsers(req: AuthResuest, res: Response){
        try{
            const id = req?.user.id as string;
            const user = await DatabaseError.User.findone({
                where: {id1:id}
            });
            return ResponseService({
                res,
                data: user?.toJSON(),
                message: "User datails"
            });
        }
        catch(error){
            const {message, stack} = error as error;
            return ResponseService({
                res,
                data: stack,
                message,
                status: 500,
                success: false
            });
        }
    }

    //Login user
    
    public async login (req: LoginUserRequest, res: Response){
        try{
            const {email, password} = req.body;
            const user = await DatabaseError.User.findOne({
                where:{email}
            });

            if (!user){
                return ResponseService({
                    res,
                    data: null,
                    status: 404,
                    message: "user doesn't exist. Please register"
                });
            }

            const isMatching = await isPasswordMatch(password, user?.dataValues.password as string);
            if (!isMatching){
                return ResponseService({
                    res,
                    messsage: "Invalid email or password",
                    status: 401
                });
            }

            const token = generateToken({
                id: user?.dataValues.id1.toString(),
                email: user?.email as string
            });

            return ResponseService({
                res,
                data: {token},
                massage: "User logged in successfully",
                status: 200,
                success: true
            });
        }

        catch(error){
            const {message, stack} = error as Error;
            return ResponseService({
                res,
                data: stack,
                message,
                status: 500,
                success: false
            });
        }
}

}