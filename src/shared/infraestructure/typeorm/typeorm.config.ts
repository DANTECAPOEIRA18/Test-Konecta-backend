import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { UserOrmEntity } from './entities/user.orm-entity';
import { TaskOrmEntity } from './entities/task.orm-entity';

export const getTypeOrmConfig = (): TypeOrmModuleOptions & DataSourceOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'tasks_db',
  entities: [UserOrmEntity, TaskOrmEntity],
  synchronize: true,
  autoLoadEntities: true,
  logging: false,
});
