import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../shared/base.entity';
import { User } from '../../user/entities/user.entity';

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

  @ManyToOne(() => User)
  author: User;
}
