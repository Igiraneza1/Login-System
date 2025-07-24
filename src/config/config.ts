import dotenv from 'dotenv';
// const dotenv = require('dotenv')
dotenv.config();
const getEnv = (key:string, defaultValue?: string): string => {
    const value = process.env[key];
    if (!value && defaultValue === undefined){
        throw new error(`Missing required environment variable: ${key}`)
    }
    return value || defaultValue!;
};

export const config = {
    NODE_ENV: getEnv('NODE_ENV', 'development'),
    PORT: parseInt(getEnv('PORT', '3000')),
    CLIENT_URL: getEnv('CLIENT_URL', 'http://localhost:3000'),

    GOOGLE_CLIENT_ID: getEnv('GOOGLE_CLIENT_ID'),
    GOOGLE_CLIENT_SECRET: getEnv('GOOGLE_CLIENT_SECRET'),
    GOOGLE_CALLBACK_URL: getEnv('GOOGLE_CALLBACK_URL', 'http://localhost:3000/auth/google/callback'),

    SESSION_SECRET: getEnv('SESSION_SECRET', 'your-session-secret'),

    CORS_ORIGIN: getEnv('CORS_ORIGIN', 'http://localhost:3000'),

};