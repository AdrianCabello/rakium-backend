import { ApiProperty } from '@nestjs/swagger';
import { SiteType } from '@prisma/client';

export class RakiumClientResponseDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The unique identifier of the Rakium client'
  })
  id: string;

  @ApiProperty({
    example: 'Acme Corp',
    description: 'The name of the Rakium client'
  })
  name: string;

  @ApiProperty({
    example: 'acme.example.com',
    description: 'The domain of the Rakium client'
  })
  domain: string;

  @ApiProperty({
    example: 'contact@acme.com',
    description: 'The email of the Rakium client'
  })
  email: string;

  @ApiProperty({
    example: 'BASIC',
    description: 'The type of site for the Rakium client',
    enum: SiteType
  })
  siteType: SiteType;

  @ApiProperty({
    example: true,
    description: 'Whether the Rakium client is active'
  })
  isActive: boolean;

  @ApiProperty({
    example: '2024-04-12T15:30:00Z',
    description: 'The date when the Rakium client was created'
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-04-12T15:30:00Z',
    description: 'The date when the Rakium client was last updated'
  })
  updatedAt: Date;
} 