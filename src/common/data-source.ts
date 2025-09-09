// src/data-source.ts
import { Vendor } from '../vendor/entity/vendor.entity';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv'
dotenv.config()
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  entities: [Vendor],          // <-- your entity/classes here
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
