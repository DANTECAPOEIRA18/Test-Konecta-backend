import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ITaskRepository } from '../../domain/task/task.repository';
import { Task } from '../../domain/task/task.entity';

@Injectable()
export class TasksService {
  constructor(@Inject('ITaskRepository') private readonly tasks: ITaskRepository) {}

  findAll(userId: string, completed?: boolean): Promise<Task[]> {
    return this.tasks.findAllByUser(userId, completed);
  }

  async findOne(id: string, userId: string): Promise<Task> {
    const t = await this.tasks.findByIdForUser(id, userId);
    if (!t) throw new NotFoundException('Task not found or not owned by user');
    return t;
  }

  create(userId: string, dto: { title: string; description?: string | null; completed?: boolean }): Promise<Task> {
    return this.tasks.create({ title: dto.title, description: dto.description ?? null, completed: dto.completed ?? false, userId });
  }

  async update(id: string, userId: string, data: Partial<Pick<Task, 'title'|'description'|'completed'>>): Promise<Task> {
    const t = await this.tasks.update(id, userId, data);
    if (!t) throw new NotFoundException('Task not found or not owned by user');
    return t;
  }

  async delete(id: string, userId: string): Promise<void> {
    const ok = await this.tasks.delete(id, userId);
    if (!ok) throw new NotFoundException('Task not found or not owned by user');
  }
}
