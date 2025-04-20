import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateScheduleDto {
  @ApiProperty({ description: 'Day of week (0-6, Sunday-Saturday)' })
  @IsInt()
  @Min(0)
  @Max(6)
  @IsNotEmpty()
  dayOfWeek: number;

  @ApiProperty({ description: 'Start time of the schedule' })
  @IsDate()
  @IsNotEmpty()
  startTime: Date;

  @ApiProperty({ description: 'End time of the schedule' })
  @IsDate()
  @IsNotEmpty()
  endTime: Date;

  @ApiProperty({ description: 'Whether the schedule is available', default: true })
  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;

  @ApiProperty({ description: 'ID of the Rakium client' })
  @IsString()
  @IsNotEmpty()
  rakiumClientId: string;
} 