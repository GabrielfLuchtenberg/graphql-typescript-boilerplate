import { AddressInfo } from "net";
import { startServer } from "../startServer";

export const setup = async () => {
  const app = await startServer();
  const address = app.address() as AddressInfo;
  const { port } = address;
  process.env.TEST_HOST = `http://127.0.0.1:${port}`;
};
