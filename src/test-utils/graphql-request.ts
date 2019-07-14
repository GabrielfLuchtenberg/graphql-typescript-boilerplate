import { request as gRequest } from "graphql-request";
import { Variables } from "graphql-request/dist/src/types";

export const testRequest = async (
  url: string,
  mutation: string,
  variables?: Variables
) => {
  return gRequest(url, mutation, variables);
};
