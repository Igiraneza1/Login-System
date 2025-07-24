import { Response, Request } from "express";

/**
 * Interface representing the user data structure
 */
export interface UserInterface {
  name: string;
  email: string;
  gender: 'male' | 'female' | 'other';
  password: string;
}

/**
 * Request type for creating a user with typed body
 */
export interface CreateUserRequest extends Request {
  body: UserInterface;
}

/**
 * Request type for login with typed body
 */
export interface LoginUserRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

/**
 * UserControllerImplementation outlines the methods expected in UserController
 */
export interface UserControllerImplementation {
  createUser(req: CreateUserRequest, res: Response): void;
  getAllUsers(req: Request, res: Response): void;
  login(req: LoginUserRequest, res: Response): void;
}
