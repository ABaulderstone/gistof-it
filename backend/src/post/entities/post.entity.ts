import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../shared/base.entity';

@Entity({ tableName: 'posts' })
export class Post extends BaseEntity {
  @Property()
  title: string;

  @Property({ nullable: true })
  slug: string;

  @Property({ type: 'text' })
  content: string;

  @Property({ default: false })
  isArchived: boolean;
}
