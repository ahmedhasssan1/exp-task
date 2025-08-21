import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminService } from 'src/admin/admin.service';
import { UserDto } from './dto/create_user.dto';
import * as bcrypt from 'bcrypt'
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { ClientsService } from 'src/clients/clients.service';
import { User_enum } from './dto/user.enum';
@Injectable()
export class AuthService {
    constructor(private readonly adminService:AdminService,
        private readonly jwtService:JwtService,
        private readonly UserService:UsersService,
        private readonly clientsService:ClientsService
    ){}

    async CreateUser(user:UserDto):Promise<String>{
        const {password,role,contact_email,company_name}=user;
        const hashPassword=await bcrypt.hash(password,10);
        const payload={
            name:user.name,
            email:user.email,
            password:hashPassword,
            role
        }
        if(role==User_enum.admin){
            await this.UserService.CreateUsers(payload)
            await this.adminService.createAdmin(payload)
        }else if(role==User_enum.client){
              if (!company_name || !contact_email) {
                throw new BadRequestException(
                    'company_name and contact_email are required for clients',
                );
            }
            const clientPayload={
            name:user.name,
            password:hashPassword,
            company_name, 
            contact_email 
            }
            await this.clientsService.createClient(clientPayload)
        }
        
        return 'user signup'
    }
    async login(login:LoginDto):Promise<{access_token:string}>{
        const {password,email}=login;
        const user=await this.UserService.FindOneUserByEmail(email);
        const passwordCorrect=await bcrypt.compare(password,user?.password as string)
        if(!passwordCorrect){
            throw new UnauthorizedException('the password incoreeect');
        }
        const payload={sub:user?.id,role:user?.role}
        return{
            access_token:await this.jwtService.signAsync(payload)
        }

    }
}
