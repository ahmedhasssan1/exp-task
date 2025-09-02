import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { ProjectsService } from 'src/projects/projects.service';
import { VendorService } from 'src/vendor/vendor.service';

@Processor('match-queue')
export class matchesScheduler extends WorkerHost {
  private readonly logger = new Logger(matchesScheduler.name);

  constructor(
    private vendorService: VendorService,
    private projectSerivce: ProjectsService,
  ) {
    super();
  }
  async process(job: any): Promise<any> {
    this.logger.log(`job started ${job.name}`);
    if (job.name == 'daily-task') {
      await this.vendorService.flagExpiredVendors();

      await this.projectSerivce.filterActiveProjects();
      console.log('🔄 Running Daily Scheduler Job...');
    }
  }
}
