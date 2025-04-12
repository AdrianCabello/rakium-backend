import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '.prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  // Helper method to clean tenant data in queries
  async cleanTenantData<T extends { tenantId?: string }>(data: T, tenantId: string): Promise<Omit<T, 'tenantId'>> {
    const { tenantId: _, ...cleanData } = data;
    return cleanData as Omit<T, 'tenantId'>;
  }
} 