import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';
import { User } from 'src/modules/user/entities/user.entity';
import { RawHeaders } from './decorators/raw-headers.decorator';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { RoleProtected } from './decorators/role-protected.decorator';
import { ValidRoles } from './interfaces';
import { Auth } from './decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

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
    @GetUser() user: User,
    @RawHeaders() headers: any
  ) {

    return {
      mssage: 'ruta privada',
      user,
      headers
    }
  }
  @Get('private2')
  // @SetMetadata('roles',['admin','super-user'])
  @RoleProtected(ValidRoles.user)
  @UseGuards(AuthGuard(), UserRoleGuard)
  testingPrivateRoute2(
    @GetUser() user: User,
  ) {
    return {
      mssage: 'ruta privada',
      user
    }
  }
  @Get('private3')
  @Auth(ValidRoles.admin,ValidRoles.superUser)
  testingPrivateRoute3(
    @GetUser() user: User,
  ) {
    return {
      mssage: 'ruta privada',
      user
    }
  }
}
