import {  forwardRef, Module } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendor } from './entity/vendor.entity';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { DocumnetModule } from 'src/documnet/documnet.module';
import { Matches } from 'src/matches/entity/matches.entity';
import { MatchesModule } from 'src/matches/matches.module';
dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forFeature([Vendor]),DocumnetModule,forwardRef(()=>MatchesModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
      global: true,
    }),
  ],
  controllers: [VendorController],
  providers: [VendorService],
  exports:[VendorService]
})
export class VendorModule {}
