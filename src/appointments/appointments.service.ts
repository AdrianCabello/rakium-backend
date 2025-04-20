import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  create(createAppointmentDto: CreateAppointmentDto) {
    return this.prisma.appointment.create({
      data: createAppointmentDto,
      include: {
        finalUser: true,
        rakiumClient: true,
      },
    });
  }

  findAll() {
    return this.prisma.appointment.findMany({
      include: {
        finalUser: true,
        rakiumClient: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.appointment.findUnique({
      where: { id },
      include: {
        finalUser: true,
        rakiumClient: true,
      },
    });
  }

  update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    return this.prisma.appointment.update({
      where: { id },
      data: updateAppointmentDto,
      include: {
        finalUser: true,
        rakiumClient: true,
      },
    });
  }

  remove(id: string) {
    return this.prisma.appointment.delete({
      where: { id },
    });
  }

  findByUserId(userId: string) {
    return this.prisma.appointment.findMany({
      where: { finalUserId: userId },
      include: {
        finalUser: true,
        rakiumClient: true,
      },
    });
  }

  findByClientId(clientId: string) {
    return this.prisma.appointment.findMany({
      where: { rakiumClientId: clientId },
      include: {
        finalUser: true,
        rakiumClient: true,
      },
    });
  }
} 