import { Migration } from '@mikro-orm/migrations';

export class Migration20231217075258 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "posts" add column "author_id" int not null;');
    this.addSql('alter table "posts" add constraint "posts_author_id_foreign" foreign key ("author_id") references "users" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "posts" drop constraint "posts_author_id_foreign";');

    this.addSql('alter table "posts" drop column "author_id";');
  }

}
