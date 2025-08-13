import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/task/entities/task.entity';
import * as  bcrypt from "bcrypt";
@Injectable()
export class UserService {
  private logger =  new Logger(UserService.name)
  constructor( @InjectRepository(User) private readonly userRepository:  Repository<User>,@InjectRepository(Task) private readonly taskRepository:  Repository<Task>){

  }
  async create(createUserDto: CreateUserDto) {
    try {

       let user = await this.userRepository.create({
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password,10)
             })
       await this.userRepository.save(user);
      const { password, createAt, updateAt,isActive,roles, id,...safeUser } = user;

       return  safeUser;
    } catch (error) {
      this.errorHandler(error)
    }
  }

  async findAll() {
    return await this.userRepository.find();
  }
/**
 *Busquedade usuario por termino (id,email,nickname)
 *
 * @param {string} term -termino de busqueda
 * @return {User} Retorna un usuario si lo encuentra
 * @memberof UserService
 */
findOne(term: string):User {
    return new User();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
  private errorHandler(error:any){
    this.logger.error(error)
    switch (error.code) {
      case '23505':
        throw new BadRequestException(error.detail);
      default:
        throw new InternalServerErrorException("Error no manejado revisar logs");
    }
  }
}
