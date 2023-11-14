import { Entity } from '@mikro-orm/core';
import { BaseEntity } from '../../shared/base.entity';

@Entity({ tableName: 'posts' })
export class Post extends BaseEntity {}
