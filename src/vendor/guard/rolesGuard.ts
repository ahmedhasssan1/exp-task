import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { User_enum } from 'src/auth/dto/user.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const token = request.cookies?.access_token;
    if (!token) {
      throw new UnauthorizedException('Access denied. Please log in first.');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      if (payload.role !== User_enum.admin) {
        throw new ForbiddenException('Only admins can perform this action');
      }

      request['user'] = payload;

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
