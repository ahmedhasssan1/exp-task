import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { BullModule } from '@nestjs/bullmq';
import { VendorModule } from 'src/vendor/vendor.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { matchesScheduler } from './scheduler.processor';


@Module({
  imports:[BullModule.registerQueue({
    configKey:'main-queue',
    name:'match-queue'
  }),VendorModule,ProjectsModule],

  providers: [SchedulerService,matchesScheduler],
})
export class SchedulerModule {}
