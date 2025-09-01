  import {  forwardRef, Module } from '@nestjs/common';
  import { ProjectsService } from './projects.service';
  import { ProjectsController } from './projects.controller';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { Projects } from './entity/projects.entity';
  import { ClientsModule } from 'src/clients/clients.module';
import { Vendor } from 'src/vendor/entity/vendor.entity';
import { MatchesModule } from 'src/matches/matches.module';

  @Module({
    imports:[TypeOrmModule.forFeature([Projects,Vendor]),ClientsModule,forwardRef(()=> MatchesModule)],
    controllers: [ProjectsController],
    providers: [ProjectsService],
    exports:[ProjectsService]
  })
  export class ProjectsModule {}
