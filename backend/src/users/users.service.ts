import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
  UseFilters,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './model/user.model';
import { Model } from 'mongoose';
import { HashingService } from '../auth/hashing.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
  ) {}

  reset(user: User, newPassword: string) {
    return 'yep';
  }
  async login(user: User) {
    const dbUser = await this.findUsername(user.username);
    if (!dbUser) return;
    const isMatch = await this.hashingService.comparePassword(
      user.password,
      dbUser.salt,
      dbUser.password,
    );
    if (isMatch) {
      const payload = { username: dbUser.username, sub: dbUser.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }
  async createUser(user: User) {
    if (!user.username)
      return { exception: new BadRequestException('username is empty') };
    if (!user.password)
      return { exception: new BadRequestException('password is empty') };
    const dbUser = await this.findUsername(user.username);
    if (dbUser) {
      return {
        exception: new BadRequestException('username already registered'),
      };
    }
    const { salt, hash } = await this.hashingService.generateHashAndSalt(
      user.password,
    );
    const createdUser = await this.userModel.create({
      username: user.username,
      password: hash,
      salt: salt,
    });
    const payload = { username: createdUser.username, sub: createdUser.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  refreshToken(token: string) {
    let jwt;
    try {
      jwt = this.jwtService.verify(token);
    } catch (error) {
      return { exception: new UnauthorizedException() };
    }
    return {
      access_token: this.jwtService.sign({
        username: jwt.username,
        sub: jwt.sub,
      }),
    };
  }

  findUsername(username: string) {
    return this.userModel
      .findOne({
        username: username,
      })
      .exec();
  }
}
