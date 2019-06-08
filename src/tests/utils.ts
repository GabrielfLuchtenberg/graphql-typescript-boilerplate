import { request as gRequest } from "graphql-request";
import { Variables } from "graphql-request/dist/src/types";
import { startServer } from "../startServer";
import { AddressInfo } from "net";
const host = "http://localhost";
export const testRequest = async (mutation: string, variables?: Variables) => {
  const app = await startServer();
  const { port } = app.address() as AddressInfo;
  return gRequest(`${host}:${port}`, mutation, variables);
};
