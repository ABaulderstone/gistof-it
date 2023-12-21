import { Factory, Faker } from '@mikro-orm/seeder';
import { User, UserStatus } from '../../user/entities/user.entity';
import { EntityData } from '@mikro-orm/core';
export class UserFactory extends Factory<User> {
  model = User;

  protected definition(faker: Faker): EntityData<User> {
    return {
      email: faker.helpers.unique(faker.internet.email),
      password: faker.animal.cat(),
      status: UserStatus.PENDING,
      role: 1,
    };
  }
}
