import "reflect-metadata";
import { GraphQLServer } from "graphql-yoga";
import { resolvers } from "./resolvers";
import { createOrmConnection } from "./orm-utils";

export async function startServer() {
  const server = new GraphQLServer({
    typeDefs: "src/schema.graphql",
    resolvers
  });

  await createOrmConnection();
  await server.start();
  console.log("Server is running on localhost:4000");
}

startServer();
