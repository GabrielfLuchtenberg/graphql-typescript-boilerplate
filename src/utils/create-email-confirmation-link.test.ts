import fetch from "node-fetch";
import { Connection } from "typeorm";

import { User } from "../entity/User";
import { redis } from "../redis";
import { createOrmConnection } from "./orm-utils";
import { createEmailConfirmationLink } from "./create-email-confirmation-link";

let userId = "";

let connection: Connection;

beforeAll(async () => {
  connection = await createOrmConnection();
  const user = await User.create({
    email: "gab@bob.com",
    password: "jlkajoioiqwe"
  }).save();
  userId = user.id;
});

afterAll(async () => {
  await connection.close();
});
test("Make sure it confirms user and clears key in redis", async () => {
  const url = await createEmailConfirmationLink(
    process.env.TEST_HOST as string,
    userId,
    redis
  );

  const response = await fetch(url);
  const text = await response.text();
  expect(text).toEqual("ok");
  const user = await User.findOne({ where: { id: userId } });
  expect((user as User).confirmed).toBe(true);
  const chunks = url.split("/");
  const key = chunks[chunks.length - 1];
  const value = await redis.get(key);
  expect(value).toBeNull();
});
