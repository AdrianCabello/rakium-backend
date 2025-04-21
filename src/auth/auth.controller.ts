import { Controller, Post, Body, HttpCode, HttpStatus, Get, UseGuards, Request, UnauthorizedException, Patch, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, AuthResponse } from './dto/auth.dto';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Public } from './decorators/public.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'User login',
    description: 'Authenticate a user and receive JWT tokens. Use the access token in the Authorization header for protected endpoints.'
  })
  @ApiBody({
    type: LoginDto,
    examples: {
      'Valid Login': {
        value: {
          email: 'john.doe@example.com',
          password: 'Password123!'
        },
        summary: 'A valid login request'
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Login successful. Returns access and refresh tokens.',
    type: AuthResponse 
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Public()
  @Post('register')
  @ApiOperation({ 
    summary: 'User registration',
    description: 'Register a new user. By default, users are registered with the client_admin role.'
  })
  @ApiBody({
    type: RegisterDto,
    examples: {
      'Valid Registration': {
        value: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          password: 'Password123!'
        },
        summary: 'A valid registration request'
      }
    }
  })
  @ApiResponse({ status: 201, description: 'User successfully registered', type: AuthResponse })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponse> {
    return this.authService.register(registerDto);
  }

  @Public()
  @Get('dev-token')
  @ApiOperation({ 
    summary: 'Get development token',
    description: 'Get a JWT token for development and testing purposes. This endpoint is only available in development mode.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Development token generated successfully',
    schema: {
      type: 'object',
      properties: {
        accessToken: {
          type: 'string',
          description: 'JWT access token for testing'
        },
        message: {
          type: 'string',
          description: 'Information about the token'
        }
      }
    }
  })
  async getDevToken() {
    // Only allow in development mode
    if (process.env.NODE_ENV !== 'development') {
      throw new UnauthorizedException('This endpoint is only available in development mode');
    }

    // Create a mock admin user with all required properties
    const mockUser = {
      id: 'dev-user-id',
      email: 'dev@example.com',
      name: 'Development User',
      role: UserRole.admin,
      phone: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      rakiumClientId: null,
    };

    // Generate tokens
    const tokens = await this.authService.login(mockUser);

    return {
      accessToken: tokens.accessToken,
      message: 'This is a development token. Do not use in production.',
    };
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiSecurity('access-token')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'User profile retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getProfile(@Request() req) {
    if (!req.user || !req.user.id) {
      throw new UnauthorizedException('Invalid token');
    }
    
    return this.authService.getProfile(req.user.id);
  }

  @Patch('users/:id/role')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiSecurity('access-token')
  @ApiOperation({ summary: 'Update user role' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        role: {
          type: 'string',
          enum: ['admin', 'client_admin', 'client_user'],
          description: 'The new role for the user'
        }
      }
    },
    examples: {
      'Update to Admin': {
        value: {
          role: 'admin'
        },
        summary: 'Update user role to admin'
      }
    }
  })
  @ApiResponse({ status: 200, description: 'User role updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateUserRole(
    @Param('id') id: string,
    @Body('role') role: UserRole,
  ) {
    return this.authService.updateUserRole(id, role);
  }
} 