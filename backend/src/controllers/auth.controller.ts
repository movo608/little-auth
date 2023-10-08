import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';

import { CreateUserDTO } from 'src/validation/signup';
import { LoginUserDTO } from 'src/validation/login';

import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.authService.getTest();
  }

  @Post('login')
  postLogin(@Body() data: LoginUserDTO) {
    try {
      return this.authService.login(data);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('register')
  postRegister(@Body() data: CreateUserDTO) {
    try {
      return this.authService.signup(data);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
