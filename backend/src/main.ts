import { NestFactory } from '@nestjs/core';
import { graphqlUploadExpress } from 'graphql-upload';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({
    origin: [process.env.CLIENT_URL, 'http://localhost:3000'],
    allowedHeaders: ['Access-Control-Allow-Headers', 'Access-Control-Allow-Origin', 'Content-Type', 'Authorization'],
    credentials: true,
  });
  app.use(graphqlUploadExpress());
  await app.listen(3000);
}
bootstrap();
