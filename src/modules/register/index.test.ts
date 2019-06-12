import { User } from "../../entity/User";
import { testRequest } from "../../tests/utils";
import { startServer } from "../../startServer";
import { AddressInfo } from "net";
let port = 0;
beforeAll(async () => {
  const app = await startServer();
  const address = app.address() as AddressInfo;
  port = address.port;
});
describe("Register user", () => {
  const email = "gab@riel.com";
  const password = "jalksdf";

  const mutation = `
    mutation {
      register(email: "${email}", password: "${password}")
    }
  `;
  it("Should register a user", async () => {
    const response = await testRequest(port, mutation);
    expect(response).toEqual({ register: true });
    const users = await User.find({ where: { email } });
    expect(users).toHaveLength(1);
    const user = users[0];
    expect(user.email).toEqual(email);
    expect(user.password).not.toEqual(password);
  });
});
