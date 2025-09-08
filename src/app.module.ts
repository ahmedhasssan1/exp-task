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
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import { SchedulerModule } from './scheduler/scheduler.module';
import * as dotenv from 'dotenv';
import { ScheduleModule } from '@nestjs/schedule';
dotenv.config();

@Module({
  imports: [
    
    BullModule.forRoot('main-queue',{
      connection:{
        host: '192.168.116.128',
        port:Number(process.env.REDIS_PORT)  
      }
    }),
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal:true
    }),
  MongooseModule.forRoot(process.env.MONGO_STRING_CNNECTION as string),
   TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'exp-task-production.up.railway.app',
  port: 3306,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  autoLoadEntities: true,
  // synchronize: true,   
}),

    
    AdminModule, VendorModule, ClientsModule, ProjectsModule, DocumnetModule, MatchesModule, AuthModule, UsersModule, EmailModule, SchedulerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
