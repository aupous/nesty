import { CreateTaskDto } from "./dto/create-task.dto";
import { EntityRepository, Repository } from "typeorm";
import { Task } from "./task.entity";

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
}