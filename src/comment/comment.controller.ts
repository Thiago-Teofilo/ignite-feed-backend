import { Body, Controller, Delete, Post, Req, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateCommentDto } from './dto/request/create-comment.dto';
import { HTTPComment } from 'src/_utils/mappers';
import { DeleteCommentDto } from './dto/request/delete-comment.dto';
import { LikeCommentDto } from './dto/request/like-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createComment(
    @Req() request: Request,
    @Body() body: CreateCommentDto,
  ): Promise<HTTPComment> {
    const userId = request['user'].sub as string;
    return this.commentService.createComment(body, userId);
  }

  @UseGuards(AuthGuard)
  @Delete()
  async DeleteCommentDto(
    @Req() request: Request,
    @Body() body: DeleteCommentDto,
  ): Promise<void> {
    const userId = request['user'].sub as string;
    return this.commentService.deleteComment(body, userId);
  }

  @UseGuards(AuthGuard)
  @Post('like')
  async likeComment(
    @Req() request: Request,
    @Body() body: LikeCommentDto,
  ): Promise<void> {
    const userId = request['user'].sub as string;
    return this.commentService.likeComment(body, userId);
  }

  @UseGuards(AuthGuard)
  @Delete('like')
  async unlikeComment(
    @Req() request: Request,
    @Body() body: LikeCommentDto,
  ): Promise<void> {
    const userId = request['user'].sub as string;
    return this.commentService.unlikeComment(body, userId);
  }
}
