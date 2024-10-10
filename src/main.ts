import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('main');

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableVersioning();
  app.enableCors({ origin: '*' });

  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Leather-CRM-Server')
    .setDescription('Leather Factory CRM Server')
    .setVersion('1.0')
    .addTag('tags')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .addServer(
      configService.get('API_BASE_URL'),
      'TeeTime Manager CRM API base url',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    operationIdFactory: (_controllerKey, methodKey) => {
      return methodKey;
    },
  });
  SwaggerModule.setup('api-docs', app, document, {
    jsonDocumentUrl: 'api-docs/crm',
  });

  const port: number = configService.get<number>('PORT') || 8080;
  await app.listen(port);

  logger.log(`Leather-Factory-CRM-Server: listening on port ${port}`);
}
bootstrap();
