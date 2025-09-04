import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { BullModule } from '@nestjs/bullmq';
import { VendorModule } from 'src/vendor/vendor.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { MatchesScheduler } from './scheduler.processor';


@Module({
  imports:[BullModule.registerQueue({
    name:'match-queue',
    configKey:'main-queue',
  }),VendorModule,ProjectsModule],

  providers: [SchedulerService,MatchesScheduler],
})
export class SchedulerModule {}
