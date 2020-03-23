import dotenv from 'dotenv';

dotenv.config();

export const {
  API_PORT,
  API_ENV,
  MONGODB_URI,
  JWT_SECRET,
  JWT_EXPIRY,
  GMAIL_EMAIL,
  GMAIL_PASS,
  HR_EMAIL,
  HR_PASS,
  HR_TOKEN
} = process.env;
