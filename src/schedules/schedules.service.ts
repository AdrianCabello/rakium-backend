import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@Injectable()
export class SchedulesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createScheduleDto: CreateScheduleDto) {
    const { rakiumClientId, ...scheduleData } = createScheduleDto;
    return this.prisma.schedule.create({
      data: {
        ...scheduleData,
        rakiumClient: {
          connect: { id: rakiumClientId },
        },
      },
      include: {
        rakiumClient: true,
      },
    });
  }

  async findAll() {
    return this.prisma.schedule.findMany({
      include: {
        rakiumClient: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.schedule.findUnique({
      where: { id },
      include: {
        rakiumClient: true,
      },
    });
  }

  async update(id: string, updateScheduleDto: UpdateScheduleDto) {
    const { rakiumClientId, ...scheduleData } = updateScheduleDto;
    return this.prisma.schedule.update({
      where: { id },
      data: {
        ...scheduleData,
        ...(rakiumClientId && {
          rakiumClient: {
            connect: { id: rakiumClientId },
          },
        }),
      },
      include: {
        rakiumClient: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.schedule.delete({
      where: { id },
      include: {
        rakiumClient: true,
      },
    });
  }
} 