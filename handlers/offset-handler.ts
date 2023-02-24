import { Response, Request } from "@tinyhttp/app";
import { knex } from "../db/db";
import { Tweet } from "../entities/tweet";

async function offsetHandler(req: Request, res: Response) {
  const offset = Number(req.query.offset);
  const limit = Number(req.query.limit);

  console.time("Offset");

  const paginatedTweets = await knex("tweets")
    .offset(offset)
    .limit(limit)
    .orderBy("id", "asc")
    .select();

  console.timeEnd("Offset");

  res.json(paginatedTweets);
}

export { offsetHandler };
