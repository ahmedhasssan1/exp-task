
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('match-queue')
export class matchesScheduler extends WorkerHost {
   async process(job: Job, token?: string): Promise<any> {
     
   }
}
