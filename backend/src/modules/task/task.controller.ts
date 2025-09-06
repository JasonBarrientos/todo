import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto, FilterTaskDto, UpdateTaskDto } from './dtos';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post(':id')
  create(@Param('id') userId: string, @Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto,userId);
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  filter( @Param('id')idUser: string,   @Query() filters: FilterTaskDto) {
    return this.taskService.filter(idUser,filters);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
