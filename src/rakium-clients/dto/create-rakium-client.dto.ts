import { IsString, IsEmail, IsEnum, IsBoolean, IsOptional } from 'class-validator';
import { SiteType } from '@prisma/client';

export class CreateRakiumClientDto {
  @IsString()
  name: string;

  @IsString()
  domain: string;

  @IsEmail()
  email: string;

  @IsEnum(SiteType)
  siteType: SiteType;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
} 