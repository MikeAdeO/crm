require('dotenv').config();
export type NODE_ENV = 'development' | 'test' | 'staging' | 'production';

export const server = {
  port: Number(process.env.PORT),
};
