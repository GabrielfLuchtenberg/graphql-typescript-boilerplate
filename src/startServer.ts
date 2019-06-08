import { GraphQLServer } from "graphql-yoga";
import { resolvers } from "./resolvers";
import { createOrmConnection } from "./orm-utils";

export async function startServer() {
  const server = new GraphQLServer({
    typeDefs: "src/schema.graphql",
    resolvers
  });
  const port = process.env.NODE_ENV === "test" ? 0 : 4000;
  await createOrmConnection();
  const app = await server.start({
    port: process.env.NODE_ENV === "test" ? 0 : 4000
  });
  console.log(`Server is running on localhost:${port}`);

  return app;
}
