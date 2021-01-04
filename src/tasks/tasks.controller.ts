import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { TasksService } from './tasks.service'
import { TaskOwnerGuard } from './task-owner.guard'
import { GetUser } from '../auth/get-user.decorator'
import { User } from '../auth/user.entity'

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get()
  getTasks() {
    return this.tasksService.getTasks()
  }

  @Get('/:id')
  @UseGuards(TaskOwnerGuard)
  getTaskById(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.getTaskById(id)
  }

  @Post()
  createTask(@GetUser() user: User, @Body(ValidationPipe) body: CreateTaskDto) {
    return this.tasksService.createTaskWithUser(user.id, body)
  }

  @Put('/:id')
  @UseGuards(TaskOwnerGuard)
  updateTaskById(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) body: UpdateTaskDto,
  ) {
    return this.tasksService.updateTask(id, body)
  }

  @Delete('/:id')
  @UseGuards(TaskOwnerGuard)
  @HttpCode(204)
  deleteTaskById(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.deleteTask(id)
  }
}
