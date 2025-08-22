import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Projects } from './entity/projects.entity';
import { ClientsModule } from 'src/clients/clients.module';

@Module({
  imports:[TypeOrmModule.forFeature([Projects]),ClientsModule],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
