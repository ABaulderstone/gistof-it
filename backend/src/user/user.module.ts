import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from './entities/user.entity';
import { UserProfile } from './entities/user-profile.entity';
import { UserRole } from './entities/user-role.entity';

@Module({
  imports: [MikroOrmModule.forFeature([User, UserProfile, UserRole])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
