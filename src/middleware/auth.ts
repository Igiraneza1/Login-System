import { Request, Response, NextFunction } from "express";
import { ResponseService } from "../utils/response";
import jwt from "jsonwebtoken";
import { secretkey } from "../utils/helper";

// Type for token payload
type userPayload = {
  id: string;
  email: string;
};

// Extended JWT payload with custom fields
interface jwtPayloadExtra extends jwt.JwtPayload {
  _id: string;
  email: string;
}

// Extend Express Request with user
export interface AuthRequest extends Request {
  user?: userPayload;
}

// 🛑 In-memory blacklist (replace with Redis or DB in production)
const tokenBlacklist: Set<string> = new Set();

export const addToBlacklist = (token: string) => {
  tokenBlacklist.add(token);
};

// ✅ Auth Middleware
export const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return ResponseService({
        res,
        message: "Unauthorized Access - No token provided",
        status: 401
      });
    }

    const token = authorization.split(" ")[1];

    if (tokenBlacklist.has(token)) {
      return ResponseService({
        res,
        message: "Token is blacklisted. Please login again.",
        status: 401
      });
    }

    const decoded = jwt.verify(token, secretkey) as jwtPayloadExtra;

    // Attach user info to the request (cast req)
    (req as AuthRequest).user = {
      id: decoded.id,
      email: decoded.email
    };

    next();
  } catch (error) {
    const { message, stack } = error as Error;

    return ResponseService({
      res,
      message: "Invalid or expired token. Please login again.",
      data: stack,
      status: 401,
      success: false
    });
  }
};
