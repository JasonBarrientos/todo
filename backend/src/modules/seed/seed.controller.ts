import { Controller, Get,Query } from '@nestjs/common';
import { SeedService } from './seed.service';
import { Auth } from 'src/modules/auth/decorators';
import { ValidRoles } from 'src/modules/auth/interfaces';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Auth(ValidRoles.admin)
  @Get()
  executeSeed(@Query('quantityUsers') quantityUsers: number) {
    return this.seedService.executeSeed(quantityUsers);
  }

}
