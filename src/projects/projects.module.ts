import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Projects } from './entity/projects.entity';
import { ClientsModule } from 'src/clients/clients.module';
import { VendorModule } from 'src/vendor/vendor.module';

@Module({
  imports:[TypeOrmModule.forFeature([Projects]),ClientsModule,VendorModule],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports:[ProjectsService]
})
export class ProjectsModule {}
