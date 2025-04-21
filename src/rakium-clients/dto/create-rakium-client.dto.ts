import { IsString, IsEmail, IsEnum, IsBoolean, IsOptional } from 'class-validator';
import { SiteType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRakiumClientDto {
  @ApiProperty({
    example: 'Acme Corp',
    description: 'The name of the Rakium client',
    required: true
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'acme.example.com',
    description: 'The domain of the Rakium client',
    required: true
  })
  @IsString()
  domain: string;

  @ApiProperty({
    example: 'contact@acme.com',
    description: 'The email of the Rakium client',
    required: true
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'BASIC',
    description: 'The type of site for the Rakium client',
    enum: SiteType,
    required: true
  })
  @IsEnum(SiteType)
  siteType: SiteType;

  @ApiProperty({
    example: true,
    description: 'Whether the Rakium client is active',
    required: false,
    default: true
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
} 