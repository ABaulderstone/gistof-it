import { Factory, Faker, faker } from '@mikro-orm/seeder';
import { Post } from '../../post/entities/post.entity';
import { EntityData } from '@mikro-orm/core';
export class PostFactory extends Factory<Post> {
  model = Post;

  protected definition(faker: Faker): EntityData<Post> {
    const recentDate = faker.date.recent(100);
    return {
      title: faker.random.words(5),
      content: faker.lorem.paragraphs(5),
      createdAt: recentDate,
      updatedAt: recentDate,
    };
  }
}
