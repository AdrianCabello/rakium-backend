import { Request } from 'express';
import { User } from '@prisma/client';

export type UserRole = 'admin' | 'client_admin' | 'client_user';

export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
}

export interface RequestWithUser extends Request {
  user: {
    id: string;
    email: string;
    role: UserRole;
  };
} 