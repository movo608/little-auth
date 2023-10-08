import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User } from 'src/schemas/user.schema';

import { compare, encrypt } from 'src/utils/bcrypt';
import { LoginUserDTO } from 'src/validation/login';
import { CreateUserDTO } from 'src/validation/signup';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  getTest(): string {
    return JSON.stringify({ message: 'Hello World :: AuthService.getTest()' });
  }

  async login({ email, password }: LoginUserDTO) {
    const existingUser = await this.userModel.findOne({ email: email }).exec();

    if (!existingUser) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    if (compare(password, existingUser.password)) {
      const claim = {
        _id: existingUser._id,
        email: existingUser.email,
        name: existingUser.name,
      };

      const accessToken = this.jwtService.sign(claim, {
        secret: process.env.NEXTAUTH_SECRET,
      });

      return {
        accessToken,
      };
    } else {
      throw new UnauthorizedException('Invalid credentials.');
    }
  }

  async signup({ email, name, password }: CreateUserDTO) {
    const existingUser = await this.userModel.findOne({ email }).exec();

    if (existingUser) {
      throw new ConflictException('This email address is already used.');
    }

    const hashedPassword = await encrypt(password);

    const newUser = new this.userModel({
      email,
      name,
      password: hashedPassword,
    });

    await newUser.save();

    const claim = {
      _id: newUser._id,
      email: newUser.email,
      name: newUser.name,
    };

    const accessToken = this.jwtService.sign(claim, {
      secret: process.env.NEXTAUTH_SECRET,
    });

    return {
      accessToken,
    };
  }
}
