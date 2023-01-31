import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import { ValidationPipe } from './pipe/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(
    ValidationPipe({
      whitelist: false,
      forbidNonWhitelisted: true,
      skipMissingProperties: false,
      // forbidUnknownValues: true,
      disableErrorMessages: true,
    }),
  );
  //Swagger
  const config = new DocumentBuilder()
    .setTitle('Exchange Rate 68')
    .setDescription('Exchange Rate 68 API description')
    .setVersion('1.0')
    .addTag('Exchange Rate 68')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(4000);
  app.enableCors();
}
bootstrap();
