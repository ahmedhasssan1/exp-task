import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vendor } from './entity/vendor.entity';
import { Repository } from 'typeorm';
import { VendorDto } from './dto/createVendor.dto';
import { Matches } from 'src/matches/entity/matches.entity';
import { DocumnetService } from 'src/documnet/documnet.service';

@Injectable()
export class VendorService {
  constructor(
    @InjectRepository(Vendor) private vendorRepo: Repository<Vendor>,
    @InjectRepository(Matches) private matchRepo: Repository<Matches>,
    private readonly docsService: DocumnetService, // ✅ Inject DocumentsService properly
  ) {}

  async createVendor(vendorDto: VendorDto): Promise<Vendor> {
    const vendor = await this.vendorRepo.findOne({
      where: { name: vendorDto.name },
    });
    if (vendor) {
      throw new BadRequestException('This vendor already exists');
    }

    const newVendor = this.vendorRepo.create({
      ...vendorDto,
      rating: 0,
      response_sla_hours: 0,
    });

    return await this.vendorRepo.save(newVendor);
  }

  async findVendorById(id: number): Promise<Vendor> {
    const vendor = await this.vendorRepo.findOne({ where: { id } });
    if (!vendor) {
      throw new NotFoundException('Vendor not found');
    }
    return vendor;
  }

  async getTopVendorsByCountry(country: string) {
    const query = `
      SELECT 
          v.id AS vendor_id,
          v.name AS vendor_name,
          ROUND(AVG(m.score), 2) AS avg_score,
          GROUP_CONCAT(DISTINCT m.project_id) AS project_ids
      FROM matches m
      INNER JOIN vendor v ON v.id = m.vendor_id
      WHERE FIND_IN_SET(?, v.countries_supported)
        AND m.create_at >= NOW() - INTERVAL 30 DAY
      GROUP BY v.id, v.name
      ORDER BY avg_score DESC
      LIMIT 3
    `;

    // Get top vendors from MySQL
    const topVendors = await this.matchRepo.query(query, [country]);

    return this.docsService.addResearchDocsCount([topVendors]);
  }

  async getAllVendors(): Promise<Vendor[]> {
    const vendors = await this.vendorRepo.find();
    if (vendors.length <= 0) {
      throw new NotFoundException('No vendors found');
    }
    return vendors;
  }
}
