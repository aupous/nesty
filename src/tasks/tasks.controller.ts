import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get()
  getTasks() {
    return this.tasksService.getTasks()
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.getTaskById(id)
  }

  @Post()
  createTask(@Body(ValidationPipe) body: CreateTaskDto) {
    return this.tasksService.createTask(body)
  }

  @Put('/:id')
  updateTaskById(@Param('id', ParseIntPipe) id: number) {
    return {
      id
    }
  }

  @Delete('/:id')
  deleteTaskById(@Param('id', ParseIntPipe) id: number) {
    return {
      id
    }
  }
}
