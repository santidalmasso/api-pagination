# API Pagination

This repository contains the blog's code about [API Pagination](https://santid.me/articles/how-to-paginate-an-api).

## Setup

First you need install al dependencies with command below:

```
npm run install
```

Then you need to seed the database. I built a script that insert 2.400.000 of records, but it's a quite slow. To run:

```
npm run seed
```

## Start

To start the project run the command

```
npm run start
```

this expose a server on port 3000.

The API has 2 endpoints:

- Offset Strategy: `/offset?offset={numberToSkip}&limit={itemsToTake}`
- Cursor-based Strategy: `/cursor?cursor={tweetId}&limit={itemsToTake}`

Replace the {values} for what you want

## Benchmark

There are a small benchmark script that is executed with the command

```
npm run bench
```

this executes 1000 requests to each endpoint and calculates mean and median
