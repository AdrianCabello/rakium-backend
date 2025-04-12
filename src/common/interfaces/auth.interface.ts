import { Request } from 'express';

export type UserRole = 'admin' | 'client_admin' | 'client_user';

export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
  tenantId: string;
}

export interface RequestWithUser extends Request {
  user: JwtPayload;
} 