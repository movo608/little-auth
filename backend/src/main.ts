import { Logger } from 'nestjs-pino';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(Logger));

  app.setGlobalPrefix('api');

  app.enableCors({ origin: ['http://localhost:3000'] });

  await app.listen(process.env.PORT);
}
bootstrap();
