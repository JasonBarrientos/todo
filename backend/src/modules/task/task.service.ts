import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { UserService } from '../user/user.service';
import { FilterTaskDto } from './dtos/filters-task.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class TaskService {
  constructor(@InjectRepository(Task) private readonly tasksRepository: Repository<Task>, private readonly userService: UserService) {

  }
  async create(createTaskDto: CreateTaskDto, userId: string) {
    let user = await this.userService.findOne(userId);
    let task = await this.tasksRepository.create({ ...createTaskDto, user })
    await this.tasksRepository.save(task)
    return task;
  }

  async findAll() {
    let tasks = await this.tasksRepository.find({}) || [];
    return tasks;
  }

  async filter(userId: string, filters: FilterTaskDto) {
    let user = await this.userService.findOne(userId);
    if (!user) throw new NotFoundException(`User with id ${userId} not found`);
    let query = this.tasksRepository.createQueryBuilder('task');
    query.where('task.userId = :userId', { userId });

    let { is_done, priority, due_date } = filters
    if (is_done!=undefined) query.andWhere('task.is_done= :is_done', {is_done})
    if (priority!=undefined) query.andWhere('task.priority= :priority', {priority})
    if (due_date!=undefined) query.andWhere('task.due_date= :due_date', {due_date})
    return query.getMany();
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
