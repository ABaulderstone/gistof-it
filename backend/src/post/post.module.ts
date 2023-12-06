import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Post } from './entities/post.entity';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [MikroOrmModule.forFeature([Post]), EmailModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
