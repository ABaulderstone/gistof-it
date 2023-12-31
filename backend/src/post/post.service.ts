import { Injectable, Req } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Post } from './entities/post.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { plainToInstance } from 'class-transformer';
import { generateSlug } from './utilities/generate-slug';
import { Either } from '../shared/either';
import { RecordNotFoundError } from '../shared/errors/not-found.error';
import { wrap } from '@mikro-orm/core';
import { generatePagination } from '../shared/generate-pagination';
import { Request } from 'express';
import { Pagination } from '../shared/interfaces/pagination.interface';
import { PostDataDto } from './dto/post-data.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: EntityRepository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const postInstance = plainToInstance(Post, createPostDto);
    postInstance.slug = '';
    const newPost = this.postRepository.create(postInstance);
    await this.postRepository.getEntityManager().transactional(async (em) => {
      await em.persistAndFlush(newPost);
      const slug = generateSlug(newPost.title, newPost.id);
      newPost.slug = slug;
      await em.persistAndFlush(newPost);
    });

    return newPost;
  }

  async findAll(
    req: Request,
    limit = 5,
    page = 1,
  ): Promise<Pagination<PostDataDto>> {
    const offset = (page - 1) * limit;
    const [data, count] = await this.postRepository.findAndCount(
      {
        isArchived: false,
      },
      { limit, offset },
    );

    // load relationships
    await this.postRepository.populate(data, ['author.profile']);

    // update just the author fields we want
    const posts: PostDataDto[] = data.map((post) => ({
      ...post,
      author: { id: post.author.id, username: post.author.profile.username },
    }));

    const pagination = generatePagination<PostDataDto>(req, {
      limit,
      page,
      count,
      data: posts,
    });
    return pagination;
  }

  async findOne(id: number): Promise<Either<Post, Error>> {
    const foundPost = await this.postRepository.findOne({
      id,
      isArchived: false,
    });
    if (!foundPost) {
      const noPostErr = new RecordNotFoundError(
        `Post with id: ${id} does not exist`,
        Post,
      );
      return Either.right(noPostErr);
    }
    return Either.left(foundPost);
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const result = await this.findOne(id);
    if (result.isErr()) {
      return result;
    }
    const foundPost = result.unwrap() as Post;
    const updatedPost = wrap(foundPost).assign(updatePostDto);
    if (updatePostDto.title) {
      const slug = generateSlug(updatePostDto.title, foundPost.id);
      updatedPost.slug = slug;
    }
    await this.postRepository.getEntityManager().flush();
    return Either.left(foundPost);
  }

  async archive(id: number): Promise<Either<Post, Error>> {
    const result = await this.findOne(id);
    if (result.isErr()) {
      return result;
    }
    const updatedPost = wrap(result.unwrap()).assign({
      isArchived: true,
    }) as Post;
    await this.postRepository.getEntityManager().flush();
    return Either.left(updatedPost);
  }
}
