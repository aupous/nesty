import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
  host: 'localhost',
  port: 5432,
  type: 'postgres',
  username: 'postgres',
  password: 'postgres',
  database: 'nesty',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
  logging: true,
}