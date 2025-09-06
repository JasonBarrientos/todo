import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as  bcrypt from "bcrypt";
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthService {

  constructor(@InjectRepository(User) private readonly userRepository :  Repository<User>, 
  private readonly jwtService: JwtService,
  private readonly userService: UserService
){}

  async login(createAuthDto: LoginDto) {
    let {email,password}=createAuthDto;
    
    let user = await this.userRepository.createQueryBuilder('user')
    .where('user.email = :email',{email})
    .select(['user.password','user.isActive',' user.email','user.id','user.roles'])
    .getOne()
 
    if (!user) throw new UnauthorizedException(`Usuario no Autorizado`) ;
    if( !user.isActive) throw new UnauthorizedException(`Usuario no Activo`) ;
    if (!bcrypt.compareSync (password ,user.password)) throw new UnauthorizedException(`Usuario con contraseña invalida`) ;


    return {...user,
      token: this.getJwtToken({id:user.id})
    };
  }
  async register(createUserDto: CreateUserDto){
   try {
     let user= await this.userService.create(createUserDto);
    return {
      ...user,
      token: this.getJwtToken({id: user!.id})
    }
   } catch (error) {
      throw new Error(error.detail);
      
   }
  }
  private getJwtToken(payload: JwtPayload){
    return this.jwtService.sign(payload);
  }

}
