import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, LogLevel, Logger, ValidationPipe } from '@nestjs/common';
import { UniqueExceptionFilter } from './unique-exception.filter';

export function setupGlobals(app: INestApplication) {
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  app.useGlobalFilters(new UniqueExceptionFilter());
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: [process.env.LOG_LEVEL] as LogLevel[],
    cors: true,
  });

  setupGlobals(app);

  await app.listen(process.env.PORT);

  const logger = new Logger('Main');
  logger.log(`Application started on port ${process.env.PORT}`);
}
bootstrap();
