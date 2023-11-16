import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { PostFactory } from './factories/post.factory';
import { generateSlug } from '../post/utilities/generate-slug';

export class PostSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const posts = new PostFactory(em).make(20);
    await em.persistAndFlush(posts);
    posts.forEach((post) => {
      post.slug = generateSlug(post.title, post.id);
    });

    em.persistAndFlush(posts);
  }
}
