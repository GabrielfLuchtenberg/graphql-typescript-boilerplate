import { User } from "../../entity/User";
import { testRequest } from "../../tests/utils";
import { startServer } from "../../startServer";
import { AddressInfo } from "net";
import {
  emailDuplicated,
  passwordNotLongEnough,
  emailNotValid,
  emailNotLongEnough
} from "./error-messages";
let port = 0;
beforeAll(async () => {
  const app = await startServer();
  const address = app.address() as AddressInfo;
  port = address.port;
});
describe("Register user", () => {
  const mutation = (email: string, password: string) => `
    mutation {
      register(email: "${email}", password: "${password}"){
        path
        message
      }
    }
  `;
  it("Should register a user", async () => {
    const email = "gab@riel.com";
    const password = "asddf";
    const response = await testRequest(port, mutation(email, password));
    expect(response).toEqual({ register: null });
    const users = await User.find({ where: { email } });
    expect(users).toHaveLength(1);
    const user = users[0];
    expect(user.email).toEqual(email);
    expect(user.password).not.toEqual(password);
  });
  it("Should not be able to register a user because already have one user with same email", async () => {
    const email = "gab@riel.com";
    const password = "asddf";
    await testRequest(port, mutation(email, password));
    const response2 = await testRequest(port, mutation(email, password));
    const expectedError = [
      {
        path: "email",
        message: emailDuplicated
      }
    ];
    // console.log(response2.register);
    expect(response2.register).toMatchObject(expectedError);
  });
  it("Should fire error because password is to short", async () => {
    const email = "gab@riel.com";
    const password = "12";
    const resp: any = await testRequest(port, mutation(email, password));
    const expectedError = [
      {
        path: "password",
        message: passwordNotLongEnough
      }
    ];
    expect(resp.register).toMatchObject(expectedError);
  });
  it("Should fire error because email is not valid", async () => {
    const email = "gabriel.com";
    const password = "2112";
    const resp: any = await testRequest(port, mutation(email, password));
    const expectedError = [
      {
        path: "email",
        message: emailNotValid
      }
    ];
    expect(resp.register).toMatchObject(expectedError);
  });
  it("Should fire error because email to short", async () => {
    const email = "g@a.co";
    const password = "2112";
    const resp: any = await testRequest(port, mutation(email, password));
    const expectedError = [
      {
        path: "email",
        message: emailNotLongEnough
      }
    ];
    expect(resp.register).toMatchObject(expectedError);
  });
});
