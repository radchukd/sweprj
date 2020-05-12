import dotenv from 'dotenv';

dotenv.config();

export const {
  MONGODB_URI,
  JWT_SECRET,
  JWT_EXPIRY,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  HR_EMAIL,
  HR_PASS,
  HR_TOKEN
} = process.env;
