import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { Repository } from 'typeorm';
import { UserDto } from 'src/auth/dto/create_user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(Users) private UsersRepo:Repository<Users>){}

    async CreateUsers(User:UserDto){
        const find_user=await this.UsersRepo.findOne({where:{email:User.email}})
        console.log('debugging ',find_user);
        
        if(find_user){
            throw new BadRequestException("this email already exist");
        }
        const new_user=await this.UsersRepo.create(User);
        return await this.UsersRepo.save(new_user);
    }
    async FindOneUser(id:number){
        const user=await this.UsersRepo.findOne({where:{id}})
        return user
    }
      async FindOneUserByEmail(email:string){
        const user=await this.UsersRepo.findOne({where:{email}})
        if(!user){
            throw new NotFoundException("this user not exist")
        }
        return user
    }
}
