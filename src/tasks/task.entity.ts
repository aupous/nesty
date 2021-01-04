import { User } from '../auth/user.entity'
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  content: string

  @Column({ name: 'user_id' })
  userId: number

  @JoinColumn({ name: 'user_id' })
  @ManyToOne('User', 'tasks')
  user!: User
}
