import { Controller, Get, Param } from '@nestjs/common';
import { MatchesService } from './matches.service';

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}
  //   @Get('top-vendors/:country')
  // async getTopVendorsByCountry(@Param('country') country: string) {
  //   return await this.matchesService.getTopVendorsByCountry(country);
  // }
}