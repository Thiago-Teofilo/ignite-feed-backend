import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/request/create-comment.dto';
import { prisma } from 'src/_integrations/prisma';
import { HTTPComment } from 'src/_utils/mappers';
import { commentSelect } from 'src/_utils/entities-select-templates';
import { DeleteCommentDto } from './dto/request/delete-comment.dto';
import { LikeCommentDto } from './dto/request/like-comment.dto';

@Injectable()
export class CommentService {
  async createComment(
    { content, postId }: CreateCommentDto,
    userId: string,
  ): Promise<HTTPComment> {
    const comment = await prisma.comment.create({
      select: commentSelect,
      data: {
        content,
        postId,
        authorId: userId,
      },
    });

    return comment;
  }

  async deleteComment(
    { commentId }: DeleteCommentDto,
    userId: string,
  ): Promise<void> {
    await prisma.commentLike.deleteMany({
      where: {
        commentId,
      },
    });
    await prisma.comment.delete({
      where: {
        id: commentId,
        authorId: userId,
      },
    });
  }

  async likeComment(
    { commentId }: LikeCommentDto,
    userId: string,
  ): Promise<void> {
    await prisma.commentLike.create({
      data: {
        commentId,
        userId,
      },
    });
  }

  async unlikeComment(
    { commentId }: LikeCommentDto,
    userId: string,
  ): Promise<void> {
    await prisma.commentLike.deleteMany({
      where: {
        commentId,
        userId,
      },
    });
  }
}
