import { Router } from "express";

// Correct imports
import { ValidationMiddleware } from "../middleware/validation";
import { AuthMiddleware } from "../middleware/auth";

// Validation schemas
import { LoginUserSchema, UserCreationValidation } from "../schemas/userSchemaValidation";

// Controller
import { UserController } from "../controllers/userController";

const userRouter = Router();
const controller = new UserController();

// 👤 Route: Register new user
userRouter.post(
  '/users',
  ValidationMiddleware({
    type: 'body',
    schema: UserCreationValidation,
    refType: 'zod'  // or 'joi' if you're using Joi instead
  }),
  controller.createUser
);

// 🔒 Route: Get current user info (protected)
userRouter.get(
  '/users',
  AuthMiddleware,
  controller.getAllUsers
);

// 🔐 Route: Login user
userRouter.post(
  '/login',
  ValidationMiddleware({
    type: 'body',
    schema: LoginUserSchema,
    refType: 'zod'  // or 'joi' if you're using Joi instead
  }),
  controller.login
);

export { userRouter };
