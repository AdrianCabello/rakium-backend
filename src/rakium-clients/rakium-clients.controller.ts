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
import { RakiumClientsService } from './rakium-clients.service';
import { CreateRakiumClientDto } from './dto/create-rakium-client.dto';
import { UpdateRakiumClientDto } from './dto/update-rakium-client.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('rakium-clients')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RakiumClientsController {
  constructor(private readonly rakiumClientsService: RakiumClientsService) {}

  @Post()
  @Roles(UserRole.admin)
  create(@Body() createRakiumClientDto: CreateRakiumClientDto) {
    return this.rakiumClientsService.create(createRakiumClientDto);
  }

  @Get()
  @Roles(UserRole.admin)
  findAll() {
    return this.rakiumClientsService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.admin, UserRole.client_admin)
  findOne(@Param('id') id: string) {
    return this.rakiumClientsService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.admin, UserRole.client_admin)
  update(
    @Param('id') id: string,
    @Body() updateRakiumClientDto: UpdateRakiumClientDto,
  ) {
    return this.rakiumClientsService.update(id, updateRakiumClientDto);
  }

  @Delete(':id')
  @Roles(UserRole.admin)
  remove(@Param('id') id: string) {
    return this.rakiumClientsService.remove(id);
  }

  @Get('domain/:domain')
  @Roles(UserRole.admin, UserRole.client_admin, UserRole.client_user)
  findByDomain(@Param('domain') domain: string) {
    return this.rakiumClientsService.findByDomain(domain);
  }
} 