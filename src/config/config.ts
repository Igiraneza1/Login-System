import dotenv from 'dotenv';

// Load variables from .env file into process.env
dotenv.config();

// Helper to get environment variables with optional default values
const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key];
  if (!value && defaultValue === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value || defaultValue!;
};

// Export configuration object
export const config = {
  // Environment and server
  NODE_ENV: getEnv('NODE_ENV', 'development'),
  PORT: parseInt(getEnv('PORT', '3000')),

  // App client
  CLIENT_URL: getEnv('CLIENT_URL', 'http://localhost:3000'),

  // Google OAuth
  GOOGLE_CLIENT_ID: getEnv('GOOGLE_CLIENT_ID'),
  GOOGLE_CLIENT_SECRET: getEnv('GOOGLE_CLIENT_SECRET'),
  GOOGLE_CALLBACK_URL: getEnv('GOOGLE_CALLBACK_URL', 'http://localhost:3000/auth/google/callback'),

  // JWT/Session
  SESSION_SECRET: getEnv('SESSION_SECRET', 'default_session_secret'),

  // CORS
  CORS_ORIGIN: getEnv('CORS_ORIGIN', 'http://localhost:3000'),

  // Database (PostgreSQL)
  DB_USERNAME: getEnv('DB_USERNAME', 'postgres'),
  DB_PASSWORD: getEnv('DB_PASSWORD', 'password'),
  DB_DATABASE: getEnv('DB_DATABASE', 'login_system'),
  DB_HOST: getEnv('DB_HOST', 'localhost'),
  DB_PORT: parseInt(getEnv('DB_PORT', '5432')),
};
