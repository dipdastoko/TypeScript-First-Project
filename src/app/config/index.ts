import dotenv from 'dotenv';

dotenv.config({ path: process.cwd() + '/.env' });

export default {
  port: process.env.PROT,
  database_url: process.env.DATABASE_URL,
  bycrypt_salt_rounds: process.env.BYCRYPT_SALT_ROUNDS,
};
