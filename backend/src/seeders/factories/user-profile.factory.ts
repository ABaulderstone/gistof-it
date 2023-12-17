import { Factory, Faker } from '@mikro-orm/seeder';
import { UserProfile } from '../../user/entities/user-profile.entity';
import { EntityData } from '@mikro-orm/core';
export class UserProfileFactory extends Factory<UserProfile> {
  model = UserProfile;

  protected definition(faker: Faker): EntityData<UserProfile> {
    return {
      username: faker.random.word() + faker.random.alphaNumeric(),
      location: faker.address.city(),
    };
  }
}
