import { forwardRef, Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Matches } from './entity/matches.entity';
import { ProjectsModule } from 'src/projects/projects.module';

@Module({
  imports:[TypeOrmModule.forFeature([Matches])],
  controllers: [MatchesController],
  providers: [MatchesService],
  exports:[MatchesService]
})
export class MatchesModule {}
