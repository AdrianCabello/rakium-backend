import { IsString, IsEmail, IsEnum, IsOptional, MinLength } from 'class-validator';
import { UserRole } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
    examples: {
      'Valid Name': {
        value: 'John Doe',
        summary: 'A valid full name'
      },
      'Empty Name': {
        value: '',
        summary: 'An empty name that will fail validation'
      }
    }
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the user',
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
    description: 'The password of the user',
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
    enum: UserRole,
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
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({
    example: '+1234567890',
    description: 'The phone number of the user',
    required: false,
    examples: {
      'Valid Phone': {
        value: '+1-555-555-5555',
        summary: 'A valid phone number'
      },
      'Invalid Phone': {
        value: 'invalid-phone',
        summary: 'An invalid phone number that will fail validation'
      }
    }
  })
  @IsString()
  @IsOptional()
  phone?: string;
} 