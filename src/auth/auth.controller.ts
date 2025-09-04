import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/create_user.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() user: UserDto) {
    return await this.authService.createUser(user);
  }

  @Post('/login')
  async login(
    @Body() login: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token } = await this.authService.login(login, res);
    return { access_token };
  }
}
