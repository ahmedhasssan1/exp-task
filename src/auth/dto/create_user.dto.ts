import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { User_enum } from './user.enum';

export class UserDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsEnum(User_enum, { message: 'user must be a vendor or client' })
  role: User_enum;

  @IsOptional()
  @IsString()
  company_name?: string;

  @IsOptional()
  @IsEmail()
  contact_email?: string;
}
