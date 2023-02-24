import { db } from "./prisma/prisma";
import { faker } from "@faker-js/faker";
import { knex } from "./db/db";

(async function () {
  await knex.schema.dropTableIfExists("tweets");
  await knex.schema.createTable("tweets", (table) => {
    table.uuid("id").primary().unique();
    table.string("content");
    table.datetime("createdAt");
    table.integer("likes");
    table.string("author");
  });
  for (let i = 0; i < 48_000; i++) {
    const tweetsBatch = Array.from({ length: 500 }).map((_, j) => {
      const date = new Date("2000-01-01");
      date.setTime(date.getTime() + (i * 500 + j) * 300_000);
      return {
        id: faker.datatype.uuid(),
        content: faker.lorem.sentence(),
        createdAt: date.toISOString(),
        author: faker.internet.userName(),
        likes: faker.datatype.number({ min: 0, max: 10000 }),
      };
    });
    await knex("tweets").insert(tweetsBatch, ["id"]);
    if (i % 1000 === 0)
      console.log(`Progress: ${Number((i || 1) / 48_000).toFixed(2)}%`);
  }
})();
