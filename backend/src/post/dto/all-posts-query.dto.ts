import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class AllPostsQueryDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  amount: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  page: number;
}
