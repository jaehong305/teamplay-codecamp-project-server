import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({
    origin: true,
    allowedHeaders: ['Access-Control-Allow-Headers', 'Content-Type', 'Authorization'],
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
