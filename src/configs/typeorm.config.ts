import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';

export const typeORMConfig: TypeOrmModuleOptions = {
  // Database Type
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: Boolean(process.env.POSTGRES_SYNCHRONIZE),
};
