import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFinalUserDto } from './dto/create-final-user.dto';
import { UpdateFinalUserDto } from './dto/update-final-user.dto';

@Injectable()
export class FinalUsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFinalUserDto: CreateFinalUserDto) {
    return this.prisma.finalUser.create({
      data: {
        name: createFinalUserDto.name,
        email: createFinalUserDto.email,
        phone: createFinalUserDto.phone,
        rakiumClient: {
          connect: { id: createFinalUserDto.rakiumClientId }
        },
        user: {
          create: {
            name: createFinalUserDto.name,
            email: createFinalUserDto.email,
            password: '', // This will be set by the user later
            role: 'client_user',
            rakiumClient: {
              connect: { id: createFinalUserDto.rakiumClientId }
            }
          }
        }
      },
    });
  }

  async findAll() {
    return this.prisma.finalUser.findMany();
  }

  async findOne(id: string) {
    return this.prisma.finalUser.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateFinalUserDto: UpdateFinalUserDto) {
    const data: any = { ...updateFinalUserDto };
    
    if (updateFinalUserDto.rakiumClientId) {
      data.rakiumClient = {
        connect: { id: updateFinalUserDto.rakiumClientId }
      };
      delete data.rakiumClientId;
    }
    
    return this.prisma.finalUser.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.finalUser.delete({
      where: { id },
    });
  }

  async findAppointments(id: string) {
    return this.prisma.appointment.findMany({
      where: { finalUserId: id },
      include: {
        rakiumClient: true,
      },
    });
  }
} 