import { Controller } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Schedules')
@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  // Aquí irán los endpoints para manejar los horarios
  // Por ahora dejamos el controlador vacío
} 