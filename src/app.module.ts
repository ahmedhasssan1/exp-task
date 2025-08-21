import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { VendorModule } from './vendor/vendor.module';
import { ClientsModule } from './clients/clients.module';
import { ProjectsModule } from './projects/projects.module';
import { DocumnetModule } from './documnet/documnet.module';
import { MatchesModule } from './matches/matches.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_STRING_CNNECTION as string),
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: 3306,
      host: 'localhost',
      username: process.env.DATABASE_USERNAME,
      database: process.env.DataBase,
      password: process.env.DATABASE_PASSWORD,
      entities: [__dirname + '/../**/*.entity.js'],
      // migrations: [__dirname + '/../migrations/*.{ts,js}'],
      synchronize:true,
  }),
    
    AdminModule, VendorModule, ClientsModule, ProjectsModule, DocumnetModule, MatchesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
