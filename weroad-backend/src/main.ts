import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, LogLevel, Logger, ValidationPipe } from '@nestjs/common';
import { UniqueExceptionFilter } from './unique-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupGlobals(app: INestApplication) {
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  app.useGlobalFilters(new UniqueExceptionFilter());
}

function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder().setTitle('WeRoad API').addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: [process.env.LOG_LEVEL] as LogLevel[],
    cors: true,
  });

  setupGlobals(app);

  setupSwagger(app);

  if (process.env.NODE_ENV !== 'test') {
    await app.listen(process.env.PORT);

    const logger = new Logger('Main');
    logger.log(`Application started on port ${process.env.PORT}`);
  }
}
bootstrap();
