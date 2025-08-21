import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { UserModule } from "./user/user.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SeedModule } from './seed/seed.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [ ConfigModule.forRoot({isGlobal:true}),TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      synchronize: true,
      autoLoadEntities:true
  }),UserModule, TaskModule, SeedModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
