import { createOrmConnection } from "../orm-utils";
import { User } from "../entity/User";
import { testRequest } from "./utils";

beforeAll(async () => {
  await createOrmConnection();
});

const email = "gab@riel.com";
const password = "jalksdf";

const mutation = `
mutation {
  register(email: "${email}", password: "${password}")
}
`;

test("Register user", async () => {
  const response = await testRequest(mutation);
  expect(response).toEqual({ register: true });
  const users = await User.find({ where: { email } });
  expect(users).toHaveLength(1);
  const user = users[0];
  expect(user.email).toEqual(email);
  expect(user.password).not.toEqual(password);
});
