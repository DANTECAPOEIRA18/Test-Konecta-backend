import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { UserOrmEntity } from './user.orm-entity';

@Entity({name: 'tasks'})
export class TaskOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ default: false })
  completed!: boolean;

  @ManyToOne(() => UserOrmEntity, (u) => u.tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: UserOrmEntity;
}