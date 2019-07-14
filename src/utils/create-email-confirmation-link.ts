import { Redis } from "ioredis";
import uuid = require("uuid/v4");

export const createEmailConfirmationLink = (
  url: string,
  userId: string,
  redis: Redis
) => {
  const id = uuid();
  redis.set(id, userId, "ex", 60 * 60 * 24);

  return `${url}/confirm/${id}`;
};
