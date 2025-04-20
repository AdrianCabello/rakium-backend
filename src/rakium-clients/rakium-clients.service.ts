import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRakiumClientDto } from './dto/create-rakium-client.dto';
import { UpdateRakiumClientDto } from './dto/update-rakium-client.dto';

@Injectable()
export class RakiumClientsService {
  constructor(private prisma: PrismaService) {}

  async create(createRakiumClientDto: CreateRakiumClientDto) {
    return this.prisma.rakiumClient.create({
      data: createRakiumClientDto,
    });
  }

  async findAll() {
    return this.prisma.rakiumClient.findMany({
      include: {
        users: true,
        content: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.rakiumClient.findUnique({
      where: { id },
      include: {
        users: true,
        content: true,
        schedules: true,
      },
    });
  }

  async update(id: string, updateRakiumClientDto: UpdateRakiumClientDto) {
    return this.prisma.rakiumClient.update({
      where: { id },
      data: updateRakiumClientDto,
    });
  }

  async remove(id: string) {
    return this.prisma.rakiumClient.delete({
      where: { id },
    });
  }

  async findByDomain(domain: string) {
    return this.prisma.rakiumClient.findUnique({
      where: { domain },
      include: {
        content: true,
      },
    });
  }
} 