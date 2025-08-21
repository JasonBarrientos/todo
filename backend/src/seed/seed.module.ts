import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[AuthModule,UserModule],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
