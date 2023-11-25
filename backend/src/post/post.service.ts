import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Post } from './entities/post.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { plainToInstance } from 'class-transformer';
import { generateSlug } from './utilities/generate-slug';
import { Either } from '../shared/either';
import { RecordNotFoundError } from '../shared/errors/not-found.error';

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

  findAll(): Promise<Post[]> {
    return this.postRepository.findAll();
  }

  async findOne(id: number): Promise<Either<Post, Error>> {
    const foundPost = await this.postRepository.findOne({ id });
    if (!foundPost) {
      const noPostErr = new RecordNotFoundError(
        `Post with id: ${id} does not exist`,
        Post,
      );
      return Either.right(noPostErr);
    }
    return Either.left(foundPost);
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
