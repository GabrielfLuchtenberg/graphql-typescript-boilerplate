import { GraphQLServer } from "graphql-yoga";
import { redis } from "./redis";
import { createOrmConnection } from "./utils/orm-utils";
import { confirmEmail } from "./routes/confirm-email";
import { generateSchema } from "./utils/generate-schema";

export const startServer = async () => {
  const server = new GraphQLServer({
    schema: generateSchema(),
    context: ({ request }) => ({
      redis,
      url: `${request.protocol}://${request.get("host")}`
    })
  });

  server.express.get("/confirm/:id", confirmEmail);
  const connection = await createOrmConnection();
  const app = await server.start({
    port: process.env.NODE_ENV === "test" ? 0 : 4000
  });
  console.log("Server is running on localhost:4000");

  return { app, connection };
};
