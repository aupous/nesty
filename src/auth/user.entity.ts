import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'
import { compare } from 'bcrypt'
import { Task } from 'src/tasks/task.entity'

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  password: string

  @OneToMany('Task', 'user')
  tasks!: Task[]

  validatePassword(password: string): Promise<boolean> {
    return compare(password, this.password)
  }
}
