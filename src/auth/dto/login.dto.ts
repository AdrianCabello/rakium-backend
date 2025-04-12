import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email address of the user',
    examples: {
      'Valid Email': {
        value: 'john.doe@example.com',
        summary: 'A valid email address'
      },
      'Invalid Email': {
        value: 'invalid-email',
        summary: 'An invalid email address that will fail validation'
      }
    }
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Password123!',
    description: 'The password of the user (minimum 8 characters)',
    minLength: 8,
    examples: {
      'Valid Password': {
        value: 'Password123!',
        summary: 'A valid password that meets all requirements'
      },
      'Too Short': {
        value: 'short',
        summary: 'A password that is too short and will fail validation'
      }
    }
  })
  @IsString()
  @MinLength(8)
  password: string;
} 