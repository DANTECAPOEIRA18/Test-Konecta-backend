import { Task } from './task.entity';

export interface ITaskRepository {
  findAllByUser(userId: string, completed?: boolean): Promise<Task[]>;
  findByIdForUser(id: string, userId: string): Promise<Task | null>;
  create(data: Pick<Task, 'title' | 'description' | 'completed' | 'userId'>): Promise<Task>;
  update(id: string, userId: string, data: Partial<Pick<Task, 'title'|'description'|'completed'>>): Promise<Task | null>;
  delete(id: string, userId: string): Promise<boolean>;
}