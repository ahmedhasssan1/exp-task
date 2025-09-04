import {  Controller } from '@nestjs/common';
import { ClientsService } from './clients.service';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  // @Post('/create-client')
  // async createClient(@Body() client:ClientDto){
  //   return await this.clientsService.createClient(client);
  // }
}
