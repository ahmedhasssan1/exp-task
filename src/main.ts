import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const Port=process.env.PORT
  await app.listen( Port||3000,()=>console.log(`app running on port ${Port}`));
}
bootstrap();
