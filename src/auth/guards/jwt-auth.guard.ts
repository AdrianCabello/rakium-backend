import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    // Log the error and info for debugging
    if (err) {
      console.error('JWT Auth Error:', err);
    }
    if (info) {
      console.error('JWT Auth Info:', info);
    }

    // If there's an error or no user, throw an UnauthorizedException
    if (err || !user) {
      throw new UnauthorizedException('Unauthorized access. Please provide a valid JWT token.');
    }

    return user;
  }
} 