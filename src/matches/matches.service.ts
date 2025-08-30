import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Matches } from './entity/matches.entity';
import { matchDto } from './dto/createMatch.dto';
import { Vendor } from 'src/vendor/entity/vendor.entity';

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
      project_id: { id: matchData.projectId },
      vendor_id: { id: matchData.vendorId },
    });

    return await this.matchesRepo.save(match);
  }
  // async getTopVendorsByCountry(country: string) {
  //   const query = `
  //     SELECT 
  //         v.id AS vendor_id,
  //         v.name AS vendor_name,
  //         ROUND(AVG(m.score), 2) AS avg_score
  //     FROM matches m
  //     INNER JOIN vendor v ON v.id = m.vendor_id
  //     WHERE FIND_IN_SET(?, v.countries_supported)
  //       AND m.create_at >= NOW() - INTERVAL 30 DAY
  //     GROUP BY v.id, v.name
  //     ORDER BY avg_score DESC
  //     LIMIT 3
  //   `;

  //   const result = await this.ven.query(query, [country]);
  //   return result;
  // }
}
