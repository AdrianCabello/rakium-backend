import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';
import { PrismaService } from '../prisma/prisma.service';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Health check endpoint' })
  async check() {
    try {
      console.log('Health check requested');
      
      // Check database connection
      await this.prisma.$queryRaw`SELECT 1`;
      console.log('Database connection successful');

      return {
        status: 'ok',
        timestamp: new Date().toISOString(),
        services: {
          database: 'up',
        },
      };
    } catch (error) {
      console.error('Health check failed:', error);
      return {
        status: 'error',
        timestamp: new Date().toISOString(),
        error: error.message,
        services: {
          database: 'down',
        },
      };
    }
  }
} 