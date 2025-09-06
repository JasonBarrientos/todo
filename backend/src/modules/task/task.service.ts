import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class TaskService {
  constructor (@InjectRepository(Task) private readonly tasksRepository: Repository<Task> , private readonly userService: UserService){

  }
  async create(createTaskDto: CreateTaskDto, userId: string) {
    let user= await this.userService.findOne(userId);
    let task = await this.tasksRepository.create({...createTaskDto,user})
    await this.tasksRepository.save(task)
    return task;
  }

  async findAll() {
    let tasks = await this.tasksRepository.find({})|| [];
    return tasks;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
