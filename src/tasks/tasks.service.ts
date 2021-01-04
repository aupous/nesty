import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { Task } from './task.entity'
import { TaskRepository } from './task.repository'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
  ) {}

  getTasks() {
    return this.taskRepository.find()
  }

  getTaskById(id: number) {
    return this.taskRepository.findOne(id)
  }

  async createTask(createTaskDto: CreateTaskDto) {
    return this.taskRepository.createTask(createTaskDto)
  }

  async createTaskWithUser(userId: number, createTaskDto: CreateTaskDto) {
    return this.taskRepository.createTaskWithUser(userId, createTaskDto)
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto) {
    return this.taskRepository.updateTask(id, updateTaskDto)
  }

  async deleteTask(id: number) {
    return this.taskRepository.deleteTask(id)
  }
}
