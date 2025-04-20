import { Module } from '@nestjs/common';
import { FinalUsersService } from './final-users.service';
import { FinalUsersController } from './final-users.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FinalUsersController],
  providers: [FinalUsersService],
  exports: [FinalUsersService],
})
export class FinalUsersModule {} 