import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vendor } from './entity/vendor.entity';
import { Repository } from 'typeorm';
import { VendorDto } from './dto/createVendor.dto';
import { MatchesService } from 'src/matches/matches.service';
import { ProjectsService } from 'src/projects/projects.service';

@Injectable()
export class VendorService {
  constructor(
    @InjectRepository(Vendor) private VendorRepo: Repository<Vendor>,
    // private readonly matchesService:MatchesService
  ) {}

  async createVendor(vendordto: VendorDto): Promise<Vendor> {
    const vendor = await this.VendorRepo.findOne({
      where: { name: vendordto.name },
    });
    if (vendor) {
      throw new BadRequestException('this username already exist');
    }
    const new_vendor = await this.VendorRepo.create({
      ...vendordto,
      rating: 0,
      response_sla_hours: 0,
    });
    return await this.VendorRepo.save(new_vendor);
  }
  async findVendorById(id: number): Promise<Vendor> {
    const vendor = await this.VendorRepo.findOne({ where: { id } });
    if (!vendor) {
      throw new NotFoundException('this vendor not exist');
    }
    return vendor;
  }
    async getTopVendorsByCountry(country: string) {
    const query = `
      SELECT 
          v.id AS vendor_id,
          v.name AS vendor_name,
          ROUND(AVG(m.score), 2) AS avg_score
      FROM matches m
      INNER JOIN vendor v ON v.id = m.vendor_id
      WHERE FIND_IN_SET(?, v.countries_supported)
        AND m.create_at >= NOW() - INTERVAL 30 DAY
      GROUP BY v.id, v.name
      ORDER BY avg_score DESC
      LIMIT 3
    `;

    const result = await this.VendorRepo.query(query, [country]);
    return result;
  }
}
