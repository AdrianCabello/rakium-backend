import { Exclude, Expose } from 'class-transformer';
import { IsDate, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class AppointmentResponseDto {
  @Expose()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID único de la cita generado automáticamente'
  })
  @IsUUID()
  id: string;

  @Expose()
  @ApiProperty({
    example: '2024-04-15T10:00:00Z',
    description: 'Fecha y hora programada para la cita en formato ISO 8601'
  })
  @IsDate()
  startTime: Date;

  @Expose()
  @ApiProperty({
    example: 'El paciente presenta mejoría en los síntomas. Se recomienda continuar con el tratamiento actual.',
    description: 'Notas o comentarios adicionales sobre la cita',
    required: false
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @Expose()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174001',
    description: 'ID del usuario final asociado a la cita'
  })
  @IsUUID()
  finalUserId: string;

  @Expose()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174002',
    description: 'ID del cliente Rakium al que pertenece la cita'
  })
  @IsUUID()
  rakiumClientId: string;

  @Expose()
  @ApiProperty({
    example: '2024-04-12T15:30:00Z',
    description: 'Fecha y hora de creación del registro de la cita en formato ISO 8601'
  })
  @IsDate()
  createdAt: Date;

  @Expose()
  @ApiProperty({
    example: '2024-04-12T15:30:00Z',
    description: 'Fecha y hora de la última actualización del registro de la cita en formato ISO 8601'
  })
  @IsDate()
  updatedAt: Date;
} 