import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RequestWithUser } from '../interfaces/auth.interface';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  use(req: RequestWithUser, res: Response, next: NextFunction) {
    // Skip middleware for non-authenticated routes
    if (!req.user) {
      return next();
    }

    // Add tenantId to request for use in services
    req['tenantId'] = req.user.tenantId;
    next();
  }
} 