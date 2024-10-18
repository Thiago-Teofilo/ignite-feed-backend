import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';

import { UserService } from './user.service';
import { EditUserDto } from './dto/request/edit-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':userId')
  async fetchRecentPosts(@Param('userId') userId: string) {
    return this.userService.getUserById({ userId });
  }

  @UseGuards(AuthGuard)
  @Patch()
  async editUser(@Req() request: Request, @Body() body: EditUserDto) {
    const userId = request['user'].sub as string;
    return this.userService.editUser(body, userId);
  }
}
