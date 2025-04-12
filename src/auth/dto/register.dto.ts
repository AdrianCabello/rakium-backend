import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 'John',
    description: 'The first name of the user',
    examples: {
      'Valid Name': {
        value: 'John',
        summary: 'A valid first name'
      },
      'Empty Name': {
        value: '',
        summary: 'An empty name that will fail validation'
      }
    }
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the user',
    examples: {
      'Valid Name': {
        value: 'Doe',
        summary: 'A valid last name'
      },
      'Empty Name': {
        value: '',
        summary: 'An empty name that will fail validation'
      }
    }
  })
  @IsString()
  lastName: string;

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

  @ApiProperty({
    example: 'client_admin',
    description: 'The role of the user',
    enum: ['admin', 'client_admin', 'client_user'],
    required: false,
    examples: {
      'Client Admin': {
        value: 'client_admin',
        summary: 'A client administrator role'
      },
      'Client User': {
        value: 'client_user',
        summary: 'A regular client user role'
      },
      'Admin': {
        value: 'admin',
        summary: 'A system administrator role'
      },
      'Invalid Role': {
        value: 'invalid_role',
        summary: 'An invalid role that will fail validation'
      }
    }
  })
  @IsString()
  @IsOptional()
  role?: string;
} 