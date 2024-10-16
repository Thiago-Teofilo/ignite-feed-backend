import { IsString } from 'class-validator';

export class LikeCommentDto {
  @IsString()
  commentId: string;
}
