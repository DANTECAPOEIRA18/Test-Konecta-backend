import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from '../shared/infraestructure/typeorm/typeorm.config';
import { HealthController } from '../presentation/health.controller';
import { UsersModule } from '../presentation/users/users.module';
import { AuthModule } from '../presentation/auth/auth.module';
import { TasksModule } from '../presentation/task/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useFactory: getTypeOrmConfig }),
    AuthModule,
    UsersModule,
    TasksModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
