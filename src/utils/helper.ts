import { config } from 'dotenv';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

config(); // Load .env variables

// Secret key used to sign tokens (keep this safe in .env)
export const secretkey = process.env.JWT_SECRET || 'secret';

// 🔐 Hash the user's password using bcrypt
export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

// ✅ Compare plain password with hashed password
export const isPasswordMatch = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

// 🛡️ Generate JWT token from user info
export const generateToken = ({
  id,
  email
}: {
  id: string;
  email: string;
}): string => {
  return jwt.sign(
    { id, email },
    secretkey,
    { expiresIn: '15min' } // Token will expire in 15 minutes
  );
};

// Optional: Convert a title string into a URL-friendly slug
export const generateSlug = (title: string): string => {
  return title.trim().toLowerCase().replace(/\s+/g, '-');
};
