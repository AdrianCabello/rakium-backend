import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email address of the user'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Password123!',
    description: 'The password of the user (minimum 6 characters)',
    minLength: 6
  })
  @IsString()
  @MinLength(6)
  password: string;
}

export class RegisterDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The full name of the user'
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email address of the user'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Password123!',
    description: 'The password of the user (minimum 6 characters)',
    minLength: 6
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 'empresa1',
    description: 'Identificador único del cliente/página web (ejemplo: empresa1, empresa2, etc.). Este ID separa los datos entre diferentes clientes, asegurando que cada uno solo pueda acceder a sus propios usuarios y proyectos.',
    examples: {
      'Empresa 1': {
        value: 'empresa1',
        summary: 'Identificador para la primera empresa'
      },
      'Empresa 2': {
        value: 'empresa2',
        summary: 'Identificador para la segunda empresa'
      }
    }
  })
  @IsString()
  tenantId: string;
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
    description: 'User information',
    example: {
      id: 'user-123',
      email: 'john.doe@example.com',
      name: 'John Doe',
      role: 'client_user',
      tenantId: 'empresa1'
    }
  })
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    tenantId: string;
  };
} 