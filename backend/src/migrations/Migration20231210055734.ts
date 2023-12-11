import { Migration } from '@mikro-orm/migrations';

export class Migration20231210055734 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user_roles" ("id" serial primary key, "name" varchar(255) not null);');

    this.addSql('create table "users" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "email" varchar(255) not null, "password" varchar(255) not null, "role_id" int not null, "status" smallint not null);');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');

    this.addSql('create table "user_profiles" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "username" varchar(255) not null, "location" varchar(255) null, "user_id" int not null);');
    this.addSql('alter table "user_profiles" add constraint "user_profiles_user_id_unique" unique ("user_id");');

    this.addSql('alter table "users" add constraint "users_role_id_foreign" foreign key ("role_id") references "user_roles" ("id") on update cascade;');

    this.addSql('alter table "user_profiles" add constraint "user_profiles_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "users" drop constraint "users_role_id_foreign";');

    this.addSql('alter table "user_profiles" drop constraint "user_profiles_user_id_foreign";');

    this.addSql('drop table if exists "user_roles" cascade;');

    this.addSql('drop table if exists "users" cascade;');

    this.addSql('drop table if exists "user_profiles" cascade;');
  }

}
