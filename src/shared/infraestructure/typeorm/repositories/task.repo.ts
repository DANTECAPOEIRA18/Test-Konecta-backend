import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ITaskRepository } from '../../../../domain/task/task.repository';
import { Task } from '../../../../domain/task/task.entity';
import { TaskOrmEntity } from '../entities/task.orm-entity';
import { UserOrmEntity } from '../entities/user.orm-entity';

@Injectable()
export class TaskRepository implements ITaskRepository {
  constructor(@InjectRepository(TaskOrmEntity) private repo: Repository<TaskOrmEntity>) {}

  private map(t: TaskOrmEntity): Task {
    return new Task(t.id, t.title, t.description ?? null, t.completed, t.user.id);
  }

  async findAllByUser(userId: string, completed?: boolean): Promise<Task[]> {
    const qb = this.repo.createQueryBuilder('t')
      .leftJoinAndSelect('t.user', 'u')
      .where('u.id = :userId', { userId });
    if (completed !== undefined) qb.andWhere('t.completed = :completed', { completed });
    const rows = await qb.orderBy('t.title', 'ASC').getMany();
    return rows.map((r) => this.map(r));
  }

  async findByIdForUser(id: string, userId: string): Promise<Task | null> {
    const t = await this.repo.findOne({ where: { id }, relations: ['user'] });
    if (!t || t.user.id !== userId) return null;
    return this.map(t);
  }

  async create(data: Pick<Task, 'title' | 'description' | 'completed' | 'userId'>): Promise<Task> {
    const entity = this.repo.create({
      title: data.title,
      description: data.description ?? null,
      completed: data.completed ?? false,
      user: { id: data.userId } as UserOrmEntity,
    });
    const saved = await this.repo.save(entity);
    const withUser = await this.repo.findOne({ where: { id: saved.id }, relations: ['user'] });
    return this.map(withUser!);
  }

  async update(id: string, userId: string, data: Partial<Pick<Task, 'title'|'description'|'completed'>>): Promise<Task | null> {
    const existing = await this.repo.findOne({ where: { id }, relations: ['user'] });
    if (!existing || existing.user.id !== userId) return null;
    if (data.title !== undefined) existing.title = data.title;
    if (data.description !== undefined) existing.description = data.description as any;
    if (data.completed !== undefined) existing.completed = data.completed;
    const saved = await this.repo.save(existing);
    return this.map(saved);
  }

  async delete(id: string, userId: string): Promise<boolean> {
    const existing = await this.repo.findOne({ where: { id }, relations: ['user'] });
    if (!existing || existing.user.id !== userId) return false;
    await this.repo.delete(id);
    return true;
  }
}
