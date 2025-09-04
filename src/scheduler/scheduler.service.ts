import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(@InjectQueue('match-queue') private  matchQueue: Queue) {}

  async scheduleDailyJob() {
    // First, remove any existing repeatable jobs to avoid duplicates on restarts
    const repeatableJobs = await this.matchQueue.getRepeatableJobs();
    for (const job of repeatableJobs) {
      this.logger.warn(`🗑 Removed old repeatable job: ${job.key}`);
    }

    // Now schedule the new daily job
    await this.matchQueue.upsertJobScheduler(
      'daily-task',
      {
        pattern:'0 15 10 * * *'},
      {
        name: 'daily-task',
        data: { foo: 'bar' },
         opts: {
          backoff: 3,
          attempts: 5,
          removeOnFail: 1000,
      },
    }
    )
  

    this.logger.log(' Daily Job Scheduled Successfully!');
  }
}
