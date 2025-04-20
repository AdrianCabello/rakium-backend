import { IsEmail, IsString, MinLength, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';

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

export class RegisterDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The full name of the user',
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
    enum: UserRole,
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
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}

export class AuthResponse {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT access token'
  })
  accessToken: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT refresh token'
  })
  refreshToken: string;

  @ApiProperty({
    example: {
      id: 'uuid',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'client_admin',
    },
    description: 'User information'
  })
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  };
} 