import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { TaskRepository } from './task.repository'

@Injectable()
export class TaskOwnerGuard implements CanActivate {
  constructor(private readonly taskRepo: TaskRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const taskId = request.params.id
    const user = request.user
    const task = await this.taskRepo.findOne(taskId)
    if (!task || task.userId !== user.id) {
      throw new ForbiddenException('You are not task owner')
    }
    return true
  }
}
