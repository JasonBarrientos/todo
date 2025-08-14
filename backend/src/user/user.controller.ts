import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   *
   *
   * @param {CreateUserDto} createUserDto
   * @return {*} 
   * @memberof UserController
   */
  @ApiCreatedResponse({type:User, description: 'The record has been successfully created.'})
  @ApiBadRequestResponse({description:'Bad request'})
  @ApiBody({type: CreateUserDto})
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.userService.findOne(term);
  }

  @ApiBody({type: [UpdateUserDto]})
  @Patch(':term')
  update(@Param('term') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':term')
  remove(@Param('term') term: string) {
    return this.userService.remove(term);
  }
}
