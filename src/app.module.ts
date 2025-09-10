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
import { Admin } from './admin/entity/admin.entity';
import { Users } from './users/entity/users.entity';
import { Matches } from './matches/entity/matches.entity';
import { Vendor } from './vendor/entity/vendor.entity';
import { Projects } from './projects/entity/projects.entity';
import { Research } from './documnet/entity/docs.entity';
import { Clients } from './clients/entity/clients.entity';
dotenv.config();

@Module({
  imports: [
    BullModule.forRoot('main-queue', {
      //connecting throw linux
      connection: {
        host: process.env.REDIS_HOST,
        port: 6379,
      },
    }),
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_STRING_CONNECTION as string),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number (process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      // synchronize: true,
    }),

    AdminModule,
    VendorModule,
    ClientsModule,
    ProjectsModule,
    DocumnetModule,
    MatchesModule,
    AuthModule,
    UsersModule,
    EmailModule,
    SchedulerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
