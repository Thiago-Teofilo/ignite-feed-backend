import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from 'src/_integrations/prisma';
import { GetUserDto } from './dto/request/ge-user.dto';
import { rootPostSelects } from 'src/_utils/entities-select-templates';
import { EditUserDto } from './dto/request/edit-user.dto';

@Injectable()
export class UserService {
  async getUserById({ userId }: GetUserDto) {
    const user = await prisma.user.findUnique({
      select: {
        id: true,
        name: true,
        role: true,
        avatarUrl: true,
        bannerUrl: true,
      },
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    const userPosts = await prisma.post.findMany({
      select: rootPostSelects,
      where: {
        authorId: userId,
      },
    });

    return {
      user,
      posts: userPosts.map((post) => ({
        ...post,
        comments: post.Comment.map((comment) => ({
          ...comment,
          likes: comment.CommentLike,
          CommentLike: undefined,
        })),
        Comment: undefined,
      })),
    };
  }

  async editUser({ bannerUrl, avatarUrl }: EditUserDto, userId: string) {
    await prisma.user.update({
      data: {
        bannerUrl,
        avatarUrl,
      },
      where: {
        id: userId,
      },
    });
  }
}
