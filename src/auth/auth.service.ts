import { Injectable, UnauthorizedException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<Omit<User, 'password'> | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (user && (await bcrypt.compare(password, user.password))) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    } catch (error) {
      console.error('Error validating user:', error);
      throw new InternalServerErrorException('Error validating user');
    }
  }

  async register(registerDto: RegisterDto) {
    try {
      console.log('Registering user:', { ...registerDto, password: '[REDACTED]' });
      
      const hashedPassword = await bcrypt.hash(registerDto.password, 10);
      console.log('Password hashed successfully');

      const user = await this.prisma.user.create({
        data: {
          name: registerDto.name,
          email: registerDto.email,
          password: hashedPassword,
          role: registerDto.role || 'client_admin',
          phone: null,
          rakiumClientId: null,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          phone: true,
          rakiumClientId: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      console.log('User created successfully:', { ...user, password: '[REDACTED]' });
      return this.generateTokens(user);
    } catch (error) {
      console.error('Error registering user:', error);
      if (error.code === 'P2002') {
        throw new InternalServerErrorException('Email already exists');
      }
      throw new InternalServerErrorException('Error registering user');
    }
  }

  async login(user: Omit<User, 'password'>) {
    return this.generateTokens(user);
  }

  async getProfile(userId: string) {
    try {
      console.log('Getting profile for user:', userId);
      
      if (!userId) {
        console.error('Invalid user ID provided');
        throw new InternalServerErrorException('Invalid user ID');
      }
      
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          phone: true,
          rakiumClientId: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      console.log('Found user:', user);

      if (!user) {
        console.log('User not found');
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      console.error('Error getting profile:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error getting user profile');
    }
  }

  async updateUserRole(userId: string, role: UserRole) {
    try {
      const user = await this.prisma.user.update({
        where: { id: userId },
        data: { role },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          phone: true,
          rakiumClientId: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return user;
    } catch (error) {
      console.error('Error updating user role:', error);
      throw new InternalServerErrorException('Error updating user role');
    }
  }

  private generateTokens(user: Omit<User, 'password'>) {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: process.env.JWT_REFRESH_EXPIRATION,
        secret: process.env.JWT_REFRESH_SECRET,
      }),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        rakiumClientId: user.rakiumClientId,
      },
    };
  }
} 