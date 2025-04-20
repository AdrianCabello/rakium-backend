import { Module } from '@nestjs/common';
import { RakiumClientsService } from './rakium-clients.service';
import { RakiumClientsController } from './rakium-clients.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RakiumClientsController],
  providers: [RakiumClientsService],
  exports: [RakiumClientsService],
})
export class RakiumClientsModule {} 