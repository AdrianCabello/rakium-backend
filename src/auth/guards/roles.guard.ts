import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@prisma/client';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log('RolesGuard - Required roles:', requiredRoles);

    if (!requiredRoles) {
      console.log('RolesGuard - No roles required, allowing access');
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    console.log('RolesGuard - User:', user);

    if (!user) {
      console.log('RolesGuard - No user found, denying access');
      throw new UnauthorizedException('User not found');
    }

    const hasRole = requiredRoles.some((role) => user.role === role);
    console.log('RolesGuard - Has required role:', hasRole);

    if (!hasRole) {
      console.log('RolesGuard - User does not have required role, denying access');
      throw new UnauthorizedException('User does not have required role');
    }

    return true;
  }
} 