import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/request/create-user.dto';
import { AuthenticateUserDto } from './dto/request/authenticate-user.dto';
import { HTTPSession } from 'src/_utils/mappers';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterUserDto): Promise<HTTPSession> {
    return this.authService.register(body);
  }

  @Post()
  async authenticate(@Body() body: AuthenticateUserDto): Promise<HTTPSession> {
    return this.authService.authenticate(body);
  }
}
