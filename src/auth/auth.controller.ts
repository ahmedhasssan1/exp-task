import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/create_user.dto';
import { LoginDto } from './dto/login.dto';
import { log } from 'console';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/signup')
  async signup(@Body()user:UserDto){
    return this.authService.CreateUser(user)
  }
  @Post('/login')
  async login(@Body() login:LoginDto){
    return await this.authService.login(login)
  }
}
