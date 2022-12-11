import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://messenger-client-production-cafb.up.railway.app',
    allowedHeaders: '*',
    credentials: true,
  });
  await app.listen(4000);
}
bootstrap();
