import { Column, Entity, OneToMany, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { TaskOrmEntity } from './task.orm-entity';

@Entity({ name: 'users' })
export class UserOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @OneToMany(() => TaskOrmEntity, (t) => t.user)
  tasks!: TaskOrmEntity[];
}