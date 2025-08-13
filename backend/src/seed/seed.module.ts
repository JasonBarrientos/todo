import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { UserModule } from 'src/user/user.module';
import { TaskModule } from 'src/task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[UserModule,TaskModule,TypeOrmModule],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
