import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  mongodb_url: string;
  db_name: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongodb_url: process.env.MONGO_URL || 'mongodb://localhost:27017/employee-directory',
  db_name: process.env.DB_NAME || 'mongodb://localhost:27017/employee-directory',
};

export default config;