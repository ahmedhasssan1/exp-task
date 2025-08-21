import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminModule } from 'src/admin/admin.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import * as dotenv from 'dotenv'
import { ClientsModule } from 'src/clients/clients.module';
dotenv.config()
@Module({
  imports:[AdminModule,JwtModule.register({

    secret:process.env.JWT_SECRET,
    signOptions:{expiresIn:'1d'},
    global:true
  }),
  ClientsModule,
  UsersModule
],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
