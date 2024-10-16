import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreatePostDto } from './dto/request/create-post.dto';
import { PostService } from './post.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { HTTPPost } from 'src/_utils/mappers';
import { DeletePostDto } from './dto/request/delete-post.dto';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createPost(
    @Req() request: Request,
    @Body() body: CreatePostDto,
  ): Promise<void> {
    const userId = request['user'].sub as string;
    return this.postService.createPost(body, userId);
  }

  @Get()
  async fetchRecentPosts(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<HTTPPost[]> {
    return this.postService.fetchRecentPosts(page, limit);
  }

  @UseGuards(AuthGuard)
  @Delete()
  async deletePost(
    @Req() request: Request,
    @Body() body: DeletePostDto,
  ): Promise<void> {
    const userId = request['user'].sub as string;
    return this.postService.deletePost(body, userId);
  }
}
