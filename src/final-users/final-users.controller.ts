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
import { FinalUsersService } from './final-users.service';
import { CreateFinalUserDto } from './dto/create-final-user.dto';
import { UpdateFinalUserDto } from './dto/update-final-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Final Users')
@Controller('final-users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FinalUsersController {
  constructor(private readonly finalUsersService: FinalUsersService) {}

  @Post()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Create a final user' })
  @ApiResponse({ status: 201, description: 'The final user has been successfully created.' })
  create(@Body() createFinalUserDto: CreateFinalUserDto) {
    return this.finalUsersService.create(createFinalUserDto);
  }

  @Get()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Get all final users' })
  @ApiResponse({ status: 200, description: 'Return all final users.' })
  findAll() {
    return this.finalUsersService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Get a final user by id' })
  @ApiResponse({ status: 200, description: 'Return the final user.' })
  @ApiResponse({ status: 404, description: 'Final user not found.' })
  findOne(@Param('id') id: string) {
    return this.finalUsersService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Update a final user' })
  @ApiResponse({ status: 200, description: 'The final user has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Final user not found.' })
  update(
    @Param('id') id: string,
    @Body() updateFinalUserDto: UpdateFinalUserDto,
  ) {
    return this.finalUsersService.update(id, updateFinalUserDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Delete a final user' })
  @ApiResponse({ status: 200, description: 'The final user has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Final user not found.' })
  remove(@Param('id') id: string) {
    return this.finalUsersService.remove(id);
  }

  @Get(':id/appointments')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Get appointments for a final user' })
  @ApiResponse({ status: 200, description: 'Return the appointments for the final user.' })
  @ApiResponse({ status: 404, description: 'Final user not found.' })
  findAppointments(@Param('id') id: string) {
    return this.finalUsersService.findAppointments(id);
  }
} 