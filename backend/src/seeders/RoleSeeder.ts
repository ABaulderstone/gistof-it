import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { UserRoleFactory } from './factories/user-role.factory';

const roles = ['Admin', 'Poster', 'Paid-Subscriber', 'Subscriber'];
export class RoleSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const factory = new UserRoleFactory(em);
    const userRoles = roles.map((roleName) =>
      factory.makeOne({ name: roleName }),
    );
    await em.persistAndFlush(userRoles);
  }
}
