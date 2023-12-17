import { Factory, Faker } from '@mikro-orm/seeder';
import { UserRole } from '../../user/entities/user-role.entity';
import { EntityData } from '@mikro-orm/core';
export class UserRoleFactory extends Factory<UserRole> {
  model = UserRole;

  protected definition(faker: Faker): EntityData<UserRole> {
    return {
      name: faker.random.word(),
    };
  }
}
