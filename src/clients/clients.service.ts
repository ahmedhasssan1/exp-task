import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clients } from './entity/clients.entity';
import { Repository } from 'typeorm';
import { ClientDto } from './dto/client.dto';

@Injectable()
export class ClientsService {
    constructor(@InjectRepository(Clients) private ClientsRepo:Repository<Clients>){}
    async createClient(client:ClientDto){
        const client_exist=await this.ClientsRepo.findOne({where:{contact_email:client.contact_email}})
        if(client_exist){
            throw new BadRequestException("this email already exist");
        }
        const new_client=await this.ClientsRepo.create(client);
        return await this.ClientsRepo.save(new_client)
    }
}
