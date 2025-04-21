import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { FinalUsersModule } from './final-users/final-users.module';
import { RakiumClientsModule } from './rakium-clients/rakium-clients.module';
import { SchedulesModule } from './schedules/schedules.module';
import { ConfigModule } from './config/config.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule,
    AuthModule,
    UsersModule,
    PrismaModule,
    AppointmentsModule,
    FinalUsersModule,
    RakiumClientsModule,
    SchedulesModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
