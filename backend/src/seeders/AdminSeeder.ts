import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { UserFactory } from './factories/user.factory';
import { UserProfileFactory } from './factories/user-profile.factory';

export class AdminSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const factory = new UserFactory(em);
    const profileFactory = new UserProfileFactory(em);
    const admin1 = factory.makeOne({
      email: process.env.ADMIN_EMAIL_1,
      password: process.env.ADMIN_PASSWORD_1,
      role: 1,
    });
    const admin2 = factory.makeOne({
      email: 'adi@test.com',
      password: 'password1',
      role: 1,
    });

    await em.persistAndFlush([admin1, admin2]);
    const firstProfile = profileFactory.makeOne({
      user: admin1,
      username: 'CoolAdmin',
      location: 'Melbourne',
    });
    const secondProfile = profileFactory.makeOne({
      user: admin2,
      username: 'Adi',
      location: 'Melbourne',
    });

    await em.persistAndFlush([firstProfile, secondProfile]);
  }
}
