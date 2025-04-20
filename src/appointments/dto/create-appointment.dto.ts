import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty({
    example: '2024-04-15T10:00:00Z',
    description: 'Fecha y hora de la cita en formato ISO 8601',
    type: Date
  })
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({
    example: 'Consulta de seguimiento mensual para revisar el progreso del tratamiento',
    description: 'Notas o descripción detallada de la cita'
  })
  @IsString()
  @IsNotEmpty()
  notes: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174001',
    description: 'ID del usuario final (paciente) que tendrá la cita',
    format: 'uuid'
  })
  @IsUUID()
  @IsNotEmpty()
  finalUserId: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174002',
    description: 'ID del cliente Rakium al que pertenece la cita',
    format: 'uuid'
  })
  @IsUUID()
  @IsNotEmpty()
  rakiumClientId: string;
} 