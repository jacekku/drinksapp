import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwtAuth.guard';
import { User } from './model/user.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('create')
  async createUser(@Body() user: User) {
    const output = (await this.userService.createUser(user)) as any;
    if (output.exception) {
      throw output.exception;
    }
    return output;
  }

  @Post('login')
  async login(@Body() user: User) {
    const output = (await this.userService.login(user)) as any;
    if (output.exception) {
      throw output.exception;
    }
    return output;
  }

  @UseGuards(JwtAuthGuard)
  @Post('reset')
  async reset(
    @Headers() headers: { authorization: string },
    @Body() body: { oldPassword: string; newPassword: string },
  ) {
    const token = headers.authorization.replace('Bearer ', '');

    const output = (await this.userService.reset(token, body)) as any;
    if (output.exception) {
      throw output.exception;
    }
    return output;
  }

  @UseGuards(JwtAuthGuard)
  @Get('token')
  async getToken(@Headers() headers: { authorization: string }) {
    const token = headers.authorization.replace('Bearer ', '');
    const output = (await this.userService.refreshToken(token)) as any;
    if (output.exception) {
      throw output.exception;
    }
    return output;
  }
}
