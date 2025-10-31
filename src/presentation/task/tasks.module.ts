import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskOrmEntity } from '../../shared/infraestructure/typeorm/entities/task.orm-entity';
import { TasksController } from './tasks.controller';
import { TasksService } from '../../application/task/task.service';
import { TaskRepository } from '../../shared/infraestructure/typeorm/repositories/task.repo';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([TaskOrmEntity])],
  controllers: [TasksController],
  providers: [{ provide: 'ITaskRepository', useClass: TaskRepository }, TasksService, JwtStrategy],
})
export class TasksModule {}
