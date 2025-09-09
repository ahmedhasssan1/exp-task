import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();
import * as cookieParser from 'cookie-parser';
import { TransformInterceptor } from './common/interceptor/password_nterceptor';

async function bootstrap() {
  console.log(process.env.DB_HOST, process.env.DB_PORT, process.env.DB_USERNAME);
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TransformInterceptor());

  const Port=process.env.PORT
  app.use(cookieParser())
  app.enableCors({
  origin: 'http://localhost:3000',  // your frontend URL
  credentials: true,
});
  await app.listen( Port||3000,()=>console.log(`app running on port ${Port}`));
}
bootstrap();
