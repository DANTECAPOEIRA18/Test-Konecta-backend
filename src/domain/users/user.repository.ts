import { User } from './user.entity';

export interface IUserRepository {
  findByUsername(username: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  create(user: Pick<User, 'username' | 'password'>): Promise<User>;
}
