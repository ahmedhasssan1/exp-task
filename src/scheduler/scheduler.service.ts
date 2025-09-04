import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(@InjectQueue('match-queue') private readonly matchQueue: Queue) {}

  // 🕒 Runs every day at 5:26 PM Cairo time
  @Cron('0 0 12 * * *', { timeZone: 'Africa/Cairo' })
  async handleDailyTask() {
    this.logger.log('⏳ Adding daily-task job to queue...');

    try {
      await this.matchQueue.add('daily-task', {}, { removeOnComplete: true, removeOnFail: 100 });
      this.logger.log('Daily job added to BullMQ queue successfully!');
    } catch (error) {
      this.logger.error(' Failed to add job to queue!', error.stack);
    }
  }
}
