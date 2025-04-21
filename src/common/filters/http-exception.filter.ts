import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Log request details for debugging
    console.error('Request details:', {
      method: request.method,
      url: request.url,
      headers: request.headers,
      body: request.body,
    });

    // Log the full exception details
    console.error('Exception details:', {
      exception,
      type: exception ? typeof exception : 'null',
      stack: exception instanceof Error ? exception.stack : null,
    });

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let error = 'Internal Server Error';

    if (exception === null || exception === undefined) {
      message = 'An unexpected error occurred';
      error = 'Unexpected Error';
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      
      if (typeof exceptionResponse === 'object') {
        message = (exceptionResponse as any).message || exception.message;
        error = (exceptionResponse as any).error || 'Error';
      } else {
        message = exceptionResponse as string;
        error = 'Error';
      }
    } else if (exception instanceof Error) {
      message = exception.message;
      error = exception.name;
    }

    // Log the final error response
    console.error('Error response:', {
      status,
      message,
      error,
      path: request.url,
      timestamp: new Date().toISOString(),
    });

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message,
        error,
      });
  }
} 