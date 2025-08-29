import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Matches } from './entity/matches.entity';
import { matchDto } from './dto/createMatch.dto';

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Matches)
    private readonly matchesRepo: Repository<Matches>,
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
      project_id: { id: matchData.projectId } ,
      vendor_id: { id: matchData.vendorId } ,
    });

    return await this.matchesRepo.save(match);
  }
}
