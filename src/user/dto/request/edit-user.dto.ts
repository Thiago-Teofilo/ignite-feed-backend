import { IsOptional, IsString } from 'class-validator';

export class EditUserDto {
  @IsString()
  @IsOptional()
  bannerUrl: string;

  @IsString()
  @IsOptional()
  avatarUrl: string;
}
