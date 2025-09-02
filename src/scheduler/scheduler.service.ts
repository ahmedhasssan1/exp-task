import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(@InjectQueue('match-queue') private matchQueue: Queue) {}

  async scheduleDailyJob() {
    await this.matchQueue.add(
      'daily-task',
      {},
      {
        repeat: {
          pattern: '0 0 * * *',
        },
      },
    );
    //  testing:
// await this.matchQueue.add('daily-task', {}, { delay: 1000 });

    this.logger.log('⏰ Daily Job Scheduled Successfully!');
  }
}
