import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { PostFactory } from './factories/post.factory';
import { generateSlug } from '../post/utilities/generate-slug';
import { User } from '../user/entities/user.entity';

export class PostSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const users = await em.find(User, {});
    const posts = new PostFactory(em).make(20);
    posts.forEach((post) => {
      const randomIndex = Math.floor(Math.random() * users.length);
      post.author = users[randomIndex];
    });
    await em.persistAndFlush(posts);
    posts.forEach((post) => {
      post.slug = generateSlug(post.title, post.id);
    });

    em.persistAndFlush(posts);
  }
}
