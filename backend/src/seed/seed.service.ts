import { Injectable } from '@nestjs/common';
import { faker } from "@faker-js/faker";
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserResponseDto } from 'src/user/dto/create-user-response.dto copy';


@Injectable()
export class SeedService {
    private readonly DEFAULT_USERS = 10;

  constructor(
    private readonly authService:AuthService, @InjectRepository(User) 
    private readonly userRepository: Repository<User>) {

  }
  async executeSeed(quantityUsers?: number) {
   
    return  await this.seedUsers(quantityUsers);
  }
  private async seedUsers(quantityUsers?: number) {
    const users: CreateUserDto[] = await this.generateUsers(quantityUsers || this.DEFAULT_USERS);
    return  await this.insertUsers(users);;
  }
  private async generateUsers(quantityUsers: number): Promise<CreateUserDto[]> {
    let users: CreateUserDto[] = [];
    for (let index = 0; index < quantityUsers; index++) {
      let firstName = faker.person.firstName();
      let lastName = faker.person.lastName();
      users.push({
        name: faker.internet.username({ firstName, lastName }),
        email: faker.internet.email({ firstName, lastName }),
        password: faker.internet.password({length:8,}),
        nickname: faker.internet.username({ firstName }) 
      })
    }
    return users;
  }
  private async insertUsers(users: CreateUserDto[]) {
    let usersInserts:CreateUserResponseDto[]=[];
    await this.userRepository.deleteAll();//limpiar base de datos
    for (const user of users) {
     usersInserts.push( await this.authService.register(user))
    }
    return usersInserts;
  }
}
