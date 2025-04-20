import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AppointmentResponseDto } from './dto/appointment-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Appointments')
@ApiBearerAuth()
@Controller('appointments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @Roles(UserRole.client_user)
  @ApiOperation({ summary: 'Create a new appointment' })
  @ApiResponse({ 
    status: 201, 
    description: 'The appointment has been successfully created.',
    type: AppointmentResponseDto 
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Get()
  @Roles(UserRole.admin, UserRole.client_admin)
  @ApiOperation({ summary: 'Get all appointments' })
  @ApiResponse({ 
    status: 200, 
    description: 'Return all appointments.',
    type: [AppointmentResponseDto]
  })
  findAll() {
    return this.appointmentsService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.admin, UserRole.client_admin, UserRole.client_user)
  @ApiOperation({ summary: 'Get an appointment by id' })
  @ApiResponse({ 
    status: 200, 
    description: 'Return the appointment.',
    type: AppointmentResponseDto
  })
  @ApiResponse({ status: 404, description: 'Appointment not found.' })
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.admin, UserRole.client_admin)
  @ApiOperation({ summary: 'Update an appointment' })
  @ApiResponse({ 
    status: 200, 
    description: 'The appointment has been successfully updated.',
    type: AppointmentResponseDto
  })
  @ApiResponse({ status: 404, description: 'Appointment not found.' })
  update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentsService.update(id, updateAppointmentDto);
  }

  @Delete(':id')
  @Roles(UserRole.admin, UserRole.client_admin)
  @ApiOperation({ summary: 'Delete an appointment' })
  @ApiResponse({ status: 200, description: 'The appointment has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Appointment not found.' })
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(id);
  }

  @Get('user/:userId')
  @Roles(UserRole.client_user)
  @ApiOperation({ summary: 'Get appointments by user id' })
  @ApiResponse({ 
    status: 200, 
    description: 'Return all appointments for the user.',
    type: [AppointmentResponseDto]
  })
  findByUserId(@Param('userId') userId: string) {
    return this.appointmentsService.findByUserId(userId);
  }

  @Get('client/:clientId')
  @Roles(UserRole.client_admin)
  @ApiOperation({ summary: 'Get appointments by client id' })
  @ApiResponse({ 
    status: 200, 
    description: 'Return all appointments for the client.',
    type: [AppointmentResponseDto]
  })
  findByClientId(@Param('clientId') clientId: string) {
    return this.appointmentsService.findByClientId(clientId);
  }
} 