import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/request/create-post.dto';
import { prisma } from 'src/_integrations/prisma';
import { HTTPPost } from 'src/_utils/mappers';
import { DeletePostDto } from './dto/request/delete-post.dto';
import { postSelects } from 'src/_utils/entities-select-templates';

@Injectable()
export class PostService {
  async createPost({ content }: CreatePostDto, userId: string): Promise<void> {
    await prisma.post.create({
      data: {
        content,
        authorId: userId,
      },
    });
  }

  async fetchRecentPosts(page: number, limit: number): Promise<HTTPPost[]> {
    const posts = await prisma.post.findMany({
      select: postSelects,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        publishedAt: 'desc',
      },
    });

    return posts.map((post) => ({
      ...post,
      comments: post.Comment.map((comment) => ({
        ...comment,
        likes: comment.CommentLike,
        CommentLike: undefined,
      })),
      Comment: undefined,
    }));
  }

  async deletePost({ postId }: DeletePostDto, userId: string): Promise<void> {
    await prisma.post.delete({
      where: {
        id: postId,
        authorId: userId,
      },
    });
  }
}
