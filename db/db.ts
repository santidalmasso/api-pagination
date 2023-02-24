import { Tweet as T } from "../entities/tweet";
import { knex as kx } from "knex";
import { Knex } from "knex";

export const knex = kx({
  client: "sqlite3",
  connection: {
    filename: "db/dev.db",
  },
  useNullAsDefault: true,
});

declare module "knex/types/tables" {
  interface Tweet extends T {}

  interface Tables {
    tweets: Tweet;
  }
}
