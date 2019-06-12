import { request as gRequest } from "graphql-request";
import { Variables } from "graphql-request/dist/src/types";
const host = "http://localhost";

export const testRequest = async (
  port: number,
  mutation: string,
  variables?: Variables
) => {
  return gRequest(`${host}:${port}`, mutation, variables);
};
