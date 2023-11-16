import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Post } from './entities/post.entity';
import { EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: EntityRepository<Post>,
  ) {}
  create(createPostDto: CreatePostDto) {
    return 'This action adds a new post';
  }

  findAll(): Promise<Post[]> {
    return this.postRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
