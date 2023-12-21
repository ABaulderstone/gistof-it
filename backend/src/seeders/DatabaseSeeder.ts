import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { PostSeeder } from './PostSeeder';
import { RoleSeeder } from './RoleSeeder';
import { AdminSeeder } from './AdminSeeder';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    return this.call(em, [RoleSeeder, AdminSeeder, PostSeeder]);
  }
}
