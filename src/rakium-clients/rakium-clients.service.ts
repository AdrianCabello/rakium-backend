import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRakiumClientDto } from './dto/create-rakium-client.dto';
import { UpdateRakiumClientDto } from './dto/update-rakium-client.dto';

@Injectable()
export class RakiumClientsService {
  constructor(private prisma: PrismaService) {}

  async create(createRakiumClientDto: CreateRakiumClientDto) {
    try {
      return await this.prisma.rakiumClient.create({
        data: createRakiumClientDto,
      });
    } catch (error) {
      console.error('Error creating Rakium client:', error);
      if (error.code === 'P2002') {
        throw new InternalServerErrorException('Domain or email already exists');
      }
      throw new InternalServerErrorException('Error creating Rakium client');
    }
  }

  async findAll() {
    try {
      return await this.prisma.rakiumClient.findMany({
        include: {
          users: true,
          content: true,
        },
      });
    } catch (error) {
      console.error('Error finding all Rakium clients:', error);
      throw new InternalServerErrorException('Error retrieving Rakium clients');
    }
  }

  async findOne(id: string) {
    try {
      const client = await this.prisma.rakiumClient.findUnique({
        where: { id },
        include: {
          users: true,
          content: true,
          schedules: true,
        },
      });

      if (!client) {
        throw new NotFoundException(`Rakium client with ID ${id} not found`);
      }

      return client;
    } catch (error) {
      console.error('Error finding Rakium client:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error retrieving Rakium client');
    }
  }

  async update(id: string, updateRakiumClientDto: UpdateRakiumClientDto) {
    try {
      const client = await this.prisma.rakiumClient.update({
        where: { id },
        data: updateRakiumClientDto,
      });

      if (!client) {
        throw new NotFoundException(`Rakium client with ID ${id} not found`);
      }

      return client;
    } catch (error) {
      console.error('Error updating Rakium client:', error);
      if (error.code === 'P2025') {
        throw new NotFoundException(`Rakium client with ID ${id} not found`);
      }
      if (error.code === 'P2002') {
        throw new InternalServerErrorException('Domain or email already exists');
      }
      throw new InternalServerErrorException('Error updating Rakium client');
    }
  }

  async remove(id: string) {
    try {
      const client = await this.prisma.rakiumClient.delete({
        where: { id },
      });

      if (!client) {
        throw new NotFoundException(`Rakium client with ID ${id} not found`);
      }

      return client;
    } catch (error) {
      console.error('Error removing Rakium client:', error);
      if (error.code === 'P2025') {
        throw new NotFoundException(`Rakium client with ID ${id} not found`);
      }
      throw new InternalServerErrorException('Error removing Rakium client');
    }
  }

  async findByDomain(domain: string) {
    try {
      const client = await this.prisma.rakiumClient.findUnique({
        where: { domain },
        include: {
          content: true,
        },
      });

      if (!client) {
        throw new NotFoundException(`Rakium client with domain ${domain} not found`);
      }

      return client;
    } catch (error) {
      console.error('Error finding Rakium client by domain:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error retrieving Rakium client by domain');
    }
  }
} 