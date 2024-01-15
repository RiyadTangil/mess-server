/* eslint-disable no-undef */
import dotenv from 'dotenv'; // module, which is commonly used for loading environment variables from a file.
import path from 'path'; // Imports the built-in Node.js path module, which provides utilities for working with file and directory paths

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  default_student_pass: process.env.DEFAULT_STUDENT_PASS,
  jwt: {
    secret: process.env.JWT_SECRET,
    refresh_secret: process.env.JWT_REFRESH_SECRET,
    expires_in: process.env.JWT_EXPIRES_IN,
    refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  },
  email: process.env.EMAIL,
  appPass: process.env.APP_PASS,
  bycrypt_salt_rounds: process.env.BYCRYPT_SALT_ROUNDS
};
