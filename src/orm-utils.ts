import { createConnection, getConnectionOptions } from "typeorm";

export async function createOrmConnection() {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  return createConnection({ ...connectionOptions, name: "default" });
}
