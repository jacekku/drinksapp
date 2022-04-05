import {
  Body,
  Controller,
  Get,
  Param,
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
    const output = await this.userService.createUser(user);
    if (output.exception) {
      throw output.exception;
    }
    return output;
  }

  @Post('login')
  login(@Body() user: User) {
    return this.userService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('reset')
  reset(@Body() user: User, @Param() newPassword: string) {
    this.userService.reset(user, newPassword);
  }
  @UseGuards(JwtAuthGuard)
  @Get('token')
  async getToken(@Headers() headers: { authorization: string }) {
    const token = headers.authorization.replace('Bearer ', '');
    const output = await this.userService.refreshToken(token);
    if (output.exception) {
      throw output.exception;
    }
    return output;
  }
}
