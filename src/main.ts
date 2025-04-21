import { NestFactory } from '@nestjs/core';
import { ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  try {
    console.log('Starting application...');
    
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    });

    // Enable CORS
    app.enableCors();
    console.log('CORS enabled');

    // Global validation pipe
    app.useGlobalPipes(new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
          property: error.property,
          message: error.constraints[Object.keys(error.constraints)[0]],
        }));
        return new HttpException(result, HttpStatus.BAD_REQUEST);
      },
    }));
    console.log('Validation pipe configured');

    // Global exception filter
    app.useGlobalFilters(new HttpExceptionFilter());
    console.log('Exception filter configured');

    // Swagger documentation
    const config = new DocumentBuilder()
      .setTitle('Rakium API')
      .setDescription(`
# Rakium API Documentation

This API provides endpoints for managing Rakium clients, users, appointments, and more.

## Authentication

Most endpoints require authentication using a JWT token. To authenticate:

1. Use the \`/auth/login\` endpoint to obtain a JWT token
2. Include the token in the Authorization header as a Bearer token: \`Authorization: Bearer your-token-here\`

For development purposes, you can use the \`/auth/dev-token\` endpoint to get a test token.
      `)
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'Enter JWT token',
          in: 'header',
        },
        'access-token',
      )
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
        docExpansion: 'list',
        filter: true,
        showExtensions: true,
        showCommonExtensions: true,
      },
    });
    console.log('Swagger documentation configured');

    // Start the server
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);
    console.log(`Health check available at: http://localhost:${port}/health`);
    console.log(`Swagger documentation available at: http://localhost:${port}/api`);
  } catch (error) {
    console.error('Error starting application:', error);
    process.exit(1);
  }
}
bootstrap();
