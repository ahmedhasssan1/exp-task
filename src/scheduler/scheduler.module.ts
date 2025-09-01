import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { BullModule } from '@nestjs/bullmq';


@Module({
  imports:[BullModule.registerQueue({
    configKey:'main-queue',
    name:'match-queue'
  })],

  providers: [SchedulerService],
})
export class SchedulerModule {}
