import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(','),
    methods: [
      'GET',
      'POST',
      'PUT',
      'PATCH',
      'DELETE',
      'HEAD',
      'CONNECT',
      'OPTIONS',
      'TRACE',
    ],
    maxAge: 600,
  });
  await app.listen(8080);
  console.log('Running!');
}
bootstrap();
