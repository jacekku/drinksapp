import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
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

  async reset(
    token: string,
    body: { oldPassword: string; newPassword: string },
  ) {
    const jwt = this.jwtService.decode(token);
    const dbUser = await this.findUsername((jwt as any).username);
    const isMatch = await this.hashingService.comparePassword(
      body.oldPassword,
      dbUser.salt,
      dbUser.password,
    );
    if (!isMatch) {
      return {
        exception: new BadRequestException('password is not correct'),
      };
    }
    return this.saveUser({
      username: dbUser.username,
      password: body.newPassword,
    } as User);
  }

  async login(user: User) {
    const dbUser = await this.findUsername(user.username);
    if (!dbUser) return { exception: new NotFoundException() };
    const isMatch = await this.hashingService.comparePassword(
      user.password,
      dbUser.salt,
      dbUser.password,
    );
    if (isMatch) {
      return await this.signToken(dbUser.username, dbUser.id);
    }
  }

  private async saveUser(user: User) {
    const { salt, hash } = await this.hashingService.generateHashAndSalt(
      user.password,
    );
    const createdUser = await this.userModel.findOneAndUpdate({
      username: user.username,
      password: hash,
      salt: salt,
    });
    return this.signToken(createdUser.username, createdUser.id);
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
    return this.saveUser(dbUser);
  }

  refreshToken(token: string) {
    let jwt;
    try {
      jwt = this.jwtService.verify(token);
    } catch (error) {
      return { exception: new UnauthorizedException() };
    }
    return this.signToken(jwt.username, jwt.sub);
  }

  findUsername(username: string) {
    return this.userModel
      .findOne({
        username: username,
      })
      .exec();
  }

  private signToken(username: string, id: string) {
    const payload = { username: username, sub: id };

    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      exp: (this.jwtService.decode(token) as any).exp,
    };
  }
}
