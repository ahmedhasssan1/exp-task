import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { VendorDto } from './dto/createVendor.dto';
import { RolesGuard } from './guard/rolesGuard';

@Controller('vendor')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @UseGuards(RolesGuard)
  @Post('/create-vendor')
  async createVendor(@Body() vendordto: VendorDto) {
    return await this.vendorService.createVendor(vendordto);
  }
  @Get('/top-vendors/:country')
  async getTopVendors(@Param('country') country: string) {
    return this.vendorService.getTopVendorsByCountry(country);
  }
  @Get()
  async allvendors(){
    return this.vendorService.getAllVendors();
  }
}
