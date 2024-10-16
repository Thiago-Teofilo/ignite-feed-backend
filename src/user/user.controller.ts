import { Controller, Get, Param } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':userId')
  async fetchRecentPosts(@Param('userId') userId: string) {
    return this.userService.getUserById({ userId });
  }
}
