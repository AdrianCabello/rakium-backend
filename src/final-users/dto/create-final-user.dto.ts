import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFinalUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the final user',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the final user',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'The phone number of the final user',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example: 'client-123',
    description: 'The ID of the Rakium client',
  })
  @IsString()
  @IsNotEmpty()
  rakiumClientId: string;
} 