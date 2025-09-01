import { forwardRef, Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Matches } from './entity/matches.entity';
import { EmailModule } from 'src/email/email.module';
import { VendorModule } from 'src/vendor/vendor.module';
import { ProjectsModule } from 'src/projects/projects.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Matches]),
    forwardRef(()=>ProjectsModule),
    EmailModule,
    forwardRef(()=>VendorModule)
  ],
  controllers: [MatchesController],
  providers: [MatchesService],
  exports: [MatchesService],
})
export class MatchesModule {}
