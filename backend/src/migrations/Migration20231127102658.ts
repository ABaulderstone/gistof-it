import { Migration } from '@mikro-orm/migrations';

export class Migration20231127102658 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "posts" add column "is_archived" boolean not null default false;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "posts" drop column "is_archived";');
  }

}
