import { IsString } from 'class-validator';

export class DeletePostDto {
  @IsString()
  postId: string;
}
