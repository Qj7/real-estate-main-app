import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // CORS: comma-separated origins or '*' to allow all (e.g. for Telegram WebView)
  const corsOrigin = process.env.CORS_ORIGIN ?? 'http://localhost:3000';
  const originList = corsOrigin === '*' ? true : corsOrigin.split(',').map((o) => o.trim()).filter(Boolean);
  app.enableCors({
    origin: originList,
    credentials: originList !== true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Telegram-Init-Data'],
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`🚀 Backend API is running on: http://localhost:${port}/api`);
}
bootstrap();
