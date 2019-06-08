import { request as gRequest } from "graphql-request";
import { Variables } from "graphql-request/dist/src/types";
const host = "http://localhost:4000";
export const testRequest = async (mutation: string, variables?: Variables) =>
  gRequest(host, mutation, variables);
