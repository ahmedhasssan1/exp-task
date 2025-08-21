import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entity/admin.entity';
import { Repository } from 'typeorm';
import { AdminDto } from './dto/admin.dto';

@Injectable()
export class AdminService {
    constructor(@InjectRepository(Admin) private adminRepo:Repository<Admin>){}
    async createAdmin(admin:AdminDto){
        const find_admin=await this.adminRepo.findOne({where:{email:admin.email}});
        if(find_admin){
            throw new BadRequestException("this user not exist anymore");
        }   
        const new_admin=await this.adminRepo.create(admin);
        await this.adminRepo.save(new_admin)
        return new_admin;
    }
}
