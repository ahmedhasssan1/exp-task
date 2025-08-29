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
import * as dotenv from 'dotenv';
import { JwtModule } from '@nestjs/jwt';
dotenv.config();

@Module({
  imports: [

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

    
    AdminModule, VendorModule, ClientsModule, ProjectsModule, DocumnetModule, MatchesModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
