import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { ProjectsService } from 'src/projects/projects.service';
import { VendorService } from 'src/vendor/vendor.service';

@Processor('match-queue')
export class MatchesScheduler extends WorkerHost {
  private readonly logger = new Logger(MatchesScheduler.name);
  private isRunning = false; 

  constructor(
    private readonly vendorService: VendorService,
    private readonly projectService: ProjectsService,
  ) {
    super();
  }

  async process(job: Job<any>): Promise<void> {
    if (this.isRunning) {
      this.logger.warn(`Skipping ${job.name} — previous job still running.`);
      return;
    }

    this.isRunning = true;
    this.logger.log(`Job started: ${job.name}`);

    try {
      if (job.name === 'daily-task') {
        await this.vendorService.flagExpiredVendors();
        await this.projectService.filterActiveProjects();
        this.logger.log(' Daily Scheduler Job Executed Successfully!');
      }
    } catch (error) {
      this.logger.error(`Job failed: ${job.name}`, error.stack);
    } finally {
      this.isRunning = false; // Always unlock the job processor
    }
  }
}
