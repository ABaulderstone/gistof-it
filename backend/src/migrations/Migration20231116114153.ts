import { Migration } from '@mikro-orm/migrations';

export class Migration20231116114153 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "posts" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" varchar(255) not null, "slug" varchar(255) null, "content" text not null);',
    );
  }
}
