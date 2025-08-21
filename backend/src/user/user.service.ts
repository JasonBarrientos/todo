import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as  bcrypt from "bcrypt";
import { validate } from "uuid";
@Injectable()
export class UserService {
  private logger = new Logger(UserService.name)
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {

  }
  async create(createUserDto: CreateUserDto) {
    try {
      let user = await this.userRepository.create({
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, 10)
      })
      await this.userRepository.save(user);
      const { password, createAt, updateAt, isActive, roles, ...safeUser } = user;
      return {
        ...safeUser,

      };
    } catch (error) {
      this.errorHandler(error)
    }
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(term: string) {
    try {
      let user;
      if (validate(term)) {
        user = await this.userRepository.findOneBy({ id: term })
      }
      else if (!user && this.isEmail(term)) {
        user = await this.userRepository.findOneBy({ email: term })
      }
      else {
        user = await this.userRepository.findOneBy({ nickname: term })
      }
      return user;
    } catch (error) {
      this.errorHandler(error)
    }
  }

  async update(term: string, updateUserDto: UpdateUserDto) {
    let user = await this.userRepository.preload({ id: term, ...updateUserDto })
    if (!user) {
      throw new BadRequestException(`User with id ${term} not found.`)
    }
    return await this.userRepository.save(user);
  }

  async remove(term: string) {
    let user = await  this.findOne(term)
     await this.userRepository.remove(user.id);
    return `This action removes a #${term} user`;
  }

  private errorHandler(error: any) {
    this.logger.error(error)
    switch (error.code) {
      case '23505':
        throw new BadRequestException(error.detail);
      default:
        throw new InternalServerErrorException("Error no manejado revisar logs");
    }
  }

  private isEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

}
