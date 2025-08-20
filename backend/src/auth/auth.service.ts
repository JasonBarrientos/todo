import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as  bcrypt from "bcrypt";

@Injectable()
export class AuthService {

  constructor(@InjectRepository(User) private readonly userRepository :  Repository<User>){}

  async login(createAuthDto: LoginDto) {
    let {email,password}=createAuthDto;
    
    let user = await this.userRepository.createQueryBuilder('user')
    .where('user.email = :email',{email})
    .select(['user.password','user.isActive'])
    .getOne()
 
    if (!user) throw new UnauthorizedException(`Usuario no Autorizado`) ;
    if( !user.isActive) throw new UnauthorizedException(`Usuario no Activo`) ;
    if (!bcrypt.compareSync (password ,user.password)) throw new UnauthorizedException(`Usuario con contraseña invalida`) ;
    //TODO: retornar jwt
    return user;
  }

}
