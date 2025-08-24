import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vendor } from './entity/vendor.entity';
import { Repository } from 'typeorm';
import { VendorDto } from './dto/createVendor.dto';

@Injectable()
export class VendorService {
  constructor(
    @InjectRepository(Vendor) private VendorRepo: Repository<Vendor>,
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
  async vendorForProject(needed_Services:string[]) {
  const find_vendors=await this.VendorRepo.createQueryBuilder('vendor')
    .where(
      needed_Services
        .map((_, i) => `vendor.service_offered LIKE :s${i}`)
        .join(' OR '),
      Object.fromEntries(
        needed_Services.map((s, i) => [`s${i}`, `%${s}%`])
      )
    )
    .getMany();
    return find_vendors;

  }
}
