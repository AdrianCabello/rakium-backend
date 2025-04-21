import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class InitService implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    await this.createAdminUser();
  }

  private async createAdminUser() {
    try {
      // Verificar si ya existe un usuario admin
      const existingAdmin = await this.prisma.user.findFirst({
        where: {
          role: UserRole.admin,
        },
      });

      if (!existingAdmin) {
        // Crear usuario admin por defecto
        const hashedPassword = await bcrypt.hash('Admin123!', 10);
        
        await this.prisma.user.create({
          data: {
            name: 'Admin User',
            email: 'admin@rakium.com',
            password: hashedPassword,
            role: UserRole.admin,
          },
        });

        console.log('Admin user created successfully');
      } else {
        console.log('Admin user already exists');
      }
    } catch (error) {
      console.error('Error creating admin user:', error);
    }
  }
} 