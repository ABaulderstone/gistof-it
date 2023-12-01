import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostModule } from './post/post.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST ?? 'cache',
        port: 6379,
      },
    }),
    BullModule.registerQueue({ name: 'emailSending' }),
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
