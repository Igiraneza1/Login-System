import { Response, Request } from "express";
import { Database } from '../database';
import { hashPassword, isPasswordMatch, generateToken } from '../utils/helper';
import { ResponseService } from "../utils/response";
import { AuthRequest } from "../middleware/auth";
import { CreateUserRequest, LoginUserRequest, UserControllerImplementation } from "../types/user";

export class UserController implements UserControllerImplementation {
  
  // Register new user
  public async createUser(req: CreateUserRequest, res: Response) {
    try {
      const { email, password, name } = req.body;

      // Check if user already exists
      const userExist = await Database.User.findOne({ where: { email } });
      if (userExist) {
        return ResponseService({
          res,
          data: null,
          status: 400,
          message: "User already exists"
        });
      }

      // Create new user with hashed password
      const user = await Database.User.create({
        email,
        password: await hashPassword(password), // fixed typo 'awiat'
        name,
        role: 'user',
        gender: 'male'
      });

      return ResponseService({
        res,
        data: user?.dataValues,
        status: 201,
        message: "User created successfully"
      });

    } catch (error) {
      const { message, stack } = error as Error;
      return ResponseService({
        res,
        data: stack,
        message,
        status: 500,
        success: false
      });
    }
  }

  // Get authenticated user's details
  public async getAllUsers(req: AuthRequest, res: Response) {
    try {
      const id = req?.user?.id as string;

      // Fixed typo: used Database.User instead of DatabaseError.User and findOne with capital O
      const user = await Database.User.findOne({ where: { id } });

      return ResponseService({
        res,
        data: user?.toJSON(),
        message: "User details"
      });

    } catch (error) {
      const { message, stack } = error as Error;
      return ResponseService({
        res,
        data: stack,
        message,
        status: 500,
        success: false
      });
    }
  }

  // Login user
  public async login(req: LoginUserRequest, res: Response) {
    try {
      const { email, password } = req.body;

      // Fixed typo: Database.User instead of DatabaseError.User
      const user = await Database.User.findOne({ where: { email } });

      if (!user) {
        return ResponseService({
          res,
          data: null,
          status: 404,
          message: "User doesn't exist. Please register"
        });
      }

      // Check if password matches
      const isMatching = await isPasswordMatch(password, user.dataValues.password as string);
      if (!isMatching) {
        return ResponseService({
          res,
          message: "Invalid email or password", // fixed typo 'messsage'
          status: 401
        });
      }

      // Generate JWT token
      const token = generateToken({
        id: user.dataValues.id.toString(), // fixed typo id1 -> id
        email: user.dataValues.email as string
      });

      return ResponseService({
        res,
        data: { token },
        message: "User logged in successfully", // fixed typo massage
        status: 200,
        success: true
      });

    } catch (error) {
      const { message, stack } = error as Error;
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
