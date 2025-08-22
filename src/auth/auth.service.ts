import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminService } from 'src/admin/admin.service';
import { UserDto } from './dto/create_user.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { ClientsService } from 'src/clients/clients.service';
import { User_enum } from './dto/user.enum';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly clientsService: ClientsService,
  ) {}

  async CreateUser(user: UserDto): Promise<string> {
    const { password, role, contact_email, company_name } = user;

    const hashPassword = await bcrypt.hash(password, 10);

    if (role === User_enum.admin) {
      const payload = { ...user, password: hashPassword };
      await this.userService.CreateUsers(payload);
      await this.adminService.createAdmin(payload);
    } else if (role === User_enum.client) {
      if (!company_name || !contact_email) {
        throw new BadRequestException(
          'company_name and contact_email are required for clients',
        );
      }
      const clientPayload = {
        name: user.name,
        password: hashPassword,
        company_name,
        contact_email,
      };
      await this.userService.CreateUsers({
        name:clientPayload.name,
        email:clientPayload.contact_email,
        password:clientPayload.password,
        role:User_enum.client
      });
      await this.clientsService.createClient(clientPayload);
    }

    return 'User created successfully';
  }

  async login(login: LoginDto, res: Response): Promise<{ access_token: string }> {
  const { email, password } = login;

  const user = await this.userService.FindOneUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new UnauthorizedException('Invalid email or password');
  }

  const payload = { sub: user.id, email: user.email, role: user.role };
  const access_token = await this.jwtService.signAsync(payload);

  // Set JWT in HttpOnly cookie
  res.cookie('access_token', access_token, {
    httpOnly: true,
    secure:false , // HTTPS in production
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  });

  return { access_token };
}
}
