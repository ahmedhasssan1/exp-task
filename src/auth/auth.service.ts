import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { AdminService } from 'src/admin/admin.service';
import { UsersService } from 'src/users/users.service';
import { ClientsService } from 'src/clients/clients.service';
import { UserDto } from './dto/create_user.dto';
import { LoginDto } from './dto/login.dto';
import { User_enum } from './dto/user.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly clientsService: ClientsService,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async createUser(userDto: UserDto): Promise<string> {
    const { role, password, company_name, contact_email } = userDto;

    const hashedPassword = await this.hashPassword(password);

    switch (role) {
      // COMMENT ADMIN ROLE BECUASE NO ONE CAN BE ADMIN

      // case User_enum.admin:
      //   await this.createAdmin(userDto, hashedPassword);
      //   break;

      case User_enum.client:
        await this.createClient(userDto, hashedPassword, company_name, contact_email);
        break;

      default:
        throw new BadRequestException('Invalid user role');
    }

    return 'User created successfully';
  }


  private async createAdmin(userDto: UserDto, hashedPassword: string) {
    const payload = { ...userDto, password: hashedPassword };
    await this.userService.CreateUsers(payload);
    await this.adminService.createAdmin(payload);
  }


  private async createClient(
    userDto: UserDto,
    hashedPassword: string,
    company_name?: string,
    contact_email?: string,
  ) {
    if (!company_name || !contact_email) {
      throw new BadRequestException(
        'company_name and contact_email are required for clients',
      );
    }

    await this.userService.CreateUsers({
      name: userDto.name,
      email: contact_email,
      password: hashedPassword,
      role: User_enum.client,
    });

    await this.clientsService.createClient({
      name: userDto.name,
      password: hashedPassword,
      company_name,
      contact_email,
    });
  }

  private async createVendor(userDto: UserDto, hashedPassword: string) {
    await this.userService.CreateUsers({
      ...userDto,
      password: hashedPassword,
    });
  }


  async login(
    loginDto: LoginDto,
    res: Response,
  ): Promise<{ access_token: string }> {
    const { email, password } = loginDto;

    const user = await this.userService.FindOneUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    const access_token = await this.jwtService.signAsync(payload);

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24, 
    });

    return { access_token };
  }
}
