import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserOrmEntity } from '../entities/user.orm-entity';
import { IUserRepository } from '../../../../domain/users/user.repository';
import { User } from '../../../../domain/users/user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectRepository(UserOrmEntity) private repo: Repository<UserOrmEntity>) {}

  async findByUsername(username: string): Promise<User | null> {
    const u = await this.repo.findOne({ where: { username } });
    return u ? new User(u.id, u.username, u.password) : null;
  }

  async findById(id: string): Promise<User | null> {
    const u = await this.repo.findOne({ where: { id } });
    return u ? new User(u.id, u.username, u.password) : null;
  }

  async create(data: Pick<User, 'username' | 'password'>): Promise<User> {
    const toSave = this.repo.create({ username: data.username, password: data.password });
    const saved = await this.repo.save(toSave);
    return new User(saved.id, saved.username, saved.password);
  }
}
