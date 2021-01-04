import { CreateTaskDto } from './dto/create-task.dto'
import { EntityRepository, Repository } from 'typeorm'
import { Task } from './task.entity'
import { UpdateTaskDto } from './dto/update-task.dto'
import { NotFoundException } from '@nestjs/common'

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto) {
    const { title, content } = createTaskDto
    const task = new Task()
    task.title = title
    task.content = content
    await task.save()
    return task
  }

  async createTaskWithUser(userId: number, createTaskDto: CreateTaskDto) {
    const { title, content } = createTaskDto
    const task = new Task()
    task.userId = userId
    task.title = title
    task.content = content
    await task.save()
    return task
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.findOne(id)
    if (!task) {
      throw new NotFoundException()
    }
    const { title, content } = updateTaskDto
    if (title) {
      task.title = title
    }
    if (content) {
      task.content = content
    }
    const newTask = await task.save()
    return newTask
  }

  async deleteTask(id: number) {
    const task = await this.findOne(id)
    if (!task) {
      throw new NotFoundException()
    }
    return await task.remove()
  }
}
