import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { BaseEntity } from '../../shared/base.entity';
import { User } from './user.entity';

@Entity({ tableName: 'user_roles' })
export class UserRole {
  @PrimaryKey()
  id: number;

  @Property()
  name: string;

  @OneToMany(() => User, (user) => user.role)
  users = new Collection<User>(this);
}
