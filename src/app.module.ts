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
import { JwtModule } from '@nestjs/jwt';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import { Clients } from './clients/entity/clients.entity';
import { BullModule } from '@nestjs/bullmq';
import { SchedulerModule } from './scheduler/scheduler.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    BullModule.forRoot('main-queue',{
      connection:{
        host: '192.168.116.128',
        port:Number(process.env.REDIS_PORT)  
      }
    }),
    ConfigModule.forRoot({
      isGlobal:true
    }),
  MongooseModule.forRoot(process.env.MONGO_STRING_CNNECTION as string),
   TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
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
