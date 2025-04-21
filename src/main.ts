import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

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
    app.useGlobalPipes(new ValidationPipe());
    console.log('Validation pipe configured');

    // Swagger documentation
    const config = new DocumentBuilder()
      .setTitle('Rakium API')
      .setDescription('The Rakium API description')
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
    SwaggerModule.setup('api', app, document);
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
