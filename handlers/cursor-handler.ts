import { Response, Request } from "@tinyhttp/app";
import { knex } from "../db/db";
import { Tweet } from "../entities/tweet";

async function cursorHandler(req: Request, res: Response) {
  const cursor = String(req.query.cursor);
  const limit = Number(req.query.limit);

  let paginatedTweets: Tweet[] = [];

  console.time("Cursor");

  // This condition is required to return to the previous page when limit is negative
  if (limit < 0) {
    // Query returns paginated tweets before cursor
    paginatedTweets = await knex
      .fromRaw(
        '(SELECT * FROM "tweets" AS T WHERE T.id < ? ORDER BY T.id DESC)',
        cursor
      )
      .limit(Math.abs(limit))
      .select();

    return res.json(paginatedTweets.reverse());
  }

  paginatedTweets = await knex("tweets")
    .where("id", Number(limit) < 0 ? "<" : ">", cursor)
    .limit(limit)
    .orderBy("id", Number(limit) < 0 ? "desc" : "asc")
    .select();

  console.timeEnd("Cursor");

  res.json(paginatedTweets);
}

export { cursorHandler };
