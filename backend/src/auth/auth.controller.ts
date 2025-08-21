import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { RawHeaders } from './decorators/raw-headers.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }


  @Post('register')
  registr(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
@GetUser() user:User,
@RawHeaders() headers:any
  ){
    console.log(user);
    
    return {
      mssage: 'ruta privada',
      user,
      headers
    }
  }
}
