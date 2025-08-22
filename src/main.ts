import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const Port=process.env.PORT
  app.use(cookieParser())
  app.enableCors({
  origin: 'http://localhost:3000',  // your frontend URL
  credentials: true,
});
  await app.listen( Port||3000,()=>console.log(`app running on port ${Port}`));
}
bootstrap();
