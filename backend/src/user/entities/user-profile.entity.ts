import { Entity, OneToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../shared/base.entity';
import { User } from './user.entity';

@Entity({ tableName: 'user_profiles' })
export class UserProfile extends BaseEntity {
  @Property()
  username: string;
  @Property({ nullable: true })
  location: string;

  @OneToOne({ mappedBy: 'user', orphanRemoval: true })
  user: User;
}
