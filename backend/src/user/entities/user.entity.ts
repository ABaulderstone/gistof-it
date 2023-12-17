import {
  Collection,
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
  OneToOne,
  Property,
} from '@mikro-orm/core';
import { UserRole } from './user-role.entity';
import { BaseEntity } from '../../shared/base.entity';
import { UserProfile } from './user-profile.entity';
import { Post } from '../../post/entities/post.entity';

@Entity({ tableName: 'users' })
export class User extends BaseEntity {
  @Property({ unique: true })
  email: string;

  @Property()
  password: string;

  @ManyToOne(() => UserRole)
  role: UserRole;

  @Enum(() => UserStatus)
  status: UserStatus;

  @OneToOne(() => UserProfile, (profile) => profile.user, {
    orphanRemoval: true,
    owner: false,
  })
  profile: UserProfile;

  @OneToMany(() => Post, (post) => post.author)
  posts = new Collection<Post>(this);
}

// NOTE TO SELF - Only add new status to the end of the enum. Otherwise things are going to break in an annoying way.
export enum UserStatus {
  PENDING,
  ACTIVE,
  SUSPENDED,
  ARCHIVED,
}
