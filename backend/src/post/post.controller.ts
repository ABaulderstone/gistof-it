import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as BlogPost } from './entities/post.entity';
import { unwrapResult } from '../shared/unwrap-result';
import { AllPostsQueryDto } from './dto/all-posts-query.dto';
import { Request } from 'express';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  findAll(@Req() req: Request, @Query() queryParams: AllPostsQueryDto) {
    const { limit, page } = queryParams;
    return this.postService.findAll(req, limit, page);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BlogPost> {
    const postResult = await this.postService.findOne(+id);
    const post = unwrapResult(BlogPost, postResult);
    return post;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<BlogPost> {
    const result = await this.postService.update(+id, updatePostDto);
    const post = unwrapResult(BlogPost, result);
    return post;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.postService.archive(+id);
    return unwrapResult(BlogPost, result);
  }
}
