import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Matches } from './entity/matches.entity';
import { matchDto } from './dto/createMatch.dto';
import { EmailService } from 'src/email/email.service';
import { VendorService } from 'src/vendor/vendor.service';
import { Query } from 'mysql2/typings/mysql/lib/protocol/sequences/Query';
import { ProjectsService } from 'src/projects/projects.service';

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Matches)
    private readonly matchesRepo: Repository<Matches>,
    private readonly emailService: EmailService,
    @Inject(forwardRef(() => VendorService))
    private vendorService: VendorService,
    @Inject(forwardRef(() => ProjectsService))
    private projectService: ProjectsService,
  ) {}

  async createOrUpdateMatch(matchData: matchDto): Promise<Matches> {
    let match = await this.matchesRepo.findOne({
      where: {
        project_id: { id: matchData.projectId },
        vendor_id: { id: matchData.vendorId },
      },
    });

    if (match) {
      match.score = matchData.score;
      return await this.matchesRepo.save(match);
    }

    match = this.matchesRepo.create({
      score: matchData.score,
      project_id: { id: matchData.projectId },
      vendor_id: { id: matchData.vendorId },
    });
     await this.newEmailforNewMatch(
      matchData.vendorId,
      matchData.projectId,
    );

    return await this.matchesRepo.save(match);
  }

  async newEmailforNewMatch(vendorId: number, projectId: number) {
    const vendor = await this.vendorService.findVendorById(vendorId);
    const project = await this.projectService.findProjectById(projectId);

    const payload = {
      //sendemailDto
      email: project.client.contact_email,
      name: project.client.name,
      projectName: project.name,
      vendorName: vendor.name,
    };

    await this.emailService.sendMatchNotification(payload);
  }

  async vendorQuery(query: string, country: [string]) {
    const top_vendor = await this.matchesRepo.query(query, [country]);
    return top_vendor;
  }

 
}
