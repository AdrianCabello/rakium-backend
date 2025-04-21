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
import { RakiumClientResponseDto } from './dto/rakium-client-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';

@ApiTags('Rakium Clients')
@ApiBearerAuth('access-token')
@ApiSecurity('access-token')
@Controller('rakium-clients')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RakiumClientsController {
  constructor(private readonly rakiumClientsService: RakiumClientsService) {}

  @Post()
  @Roles(UserRole.admin)
  @ApiOperation({ summary: 'Create a new Rakium client' })
  @ApiResponse({ 
    status: 201, 
    description: 'The Rakium client has been successfully created.',
    type: RakiumClientResponseDto 
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin role required.' })
  create(@Body() createRakiumClientDto: CreateRakiumClientDto) {
    return this.rakiumClientsService.create(createRakiumClientDto);
  }

  @Get()
  @Roles(UserRole.admin)
  @ApiOperation({ summary: 'Get all Rakium clients' })
  @ApiResponse({ 
    status: 200, 
    description: 'Return all Rakium clients.',
    type: [RakiumClientResponseDto]
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin role required.' })
  findAll() {
    return this.rakiumClientsService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.admin, UserRole.client_admin)
  @ApiOperation({ summary: 'Get a Rakium client by id' })
  @ApiResponse({ 
    status: 200, 
    description: 'Return the Rakium client.',
    type: RakiumClientResponseDto
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin or Client Admin role required.' })
  @ApiResponse({ status: 404, description: 'Rakium client not found.' })
  findOne(@Param('id') id: string) {
    return this.rakiumClientsService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.admin, UserRole.client_admin)
  @ApiOperation({ summary: 'Update a Rakium client' })
  @ApiResponse({ 
    status: 200, 
    description: 'The Rakium client has been successfully updated.',
    type: RakiumClientResponseDto
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin or Client Admin role required.' })
  @ApiResponse({ status: 404, description: 'Rakium client not found.' })
  update(
    @Param('id') id: string,
    @Body() updateRakiumClientDto: UpdateRakiumClientDto,
  ) {
    return this.rakiumClientsService.update(id, updateRakiumClientDto);
  }

  @Delete(':id')
  @Roles(UserRole.admin)
  @ApiOperation({ summary: 'Delete a Rakium client' })
  @ApiResponse({ status: 200, description: 'The Rakium client has been successfully deleted.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin role required.' })
  @ApiResponse({ status: 404, description: 'Rakium client not found.' })
  remove(@Param('id') id: string) {
    return this.rakiumClientsService.remove(id);
  }

  @Get('domain/:domain')
  @Roles(UserRole.admin, UserRole.client_admin, UserRole.client_user)
  @ApiOperation({ summary: 'Get a Rakium client by domain' })
  @ApiResponse({ 
    status: 200, 
    description: 'Return the Rakium client.',
    type: RakiumClientResponseDto
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden - Valid role required.' })
  @ApiResponse({ status: 404, description: 'Rakium client not found.' })
  findByDomain(@Param('domain') domain: string) {
    return this.rakiumClientsService.findByDomain(domain);
  }
} 