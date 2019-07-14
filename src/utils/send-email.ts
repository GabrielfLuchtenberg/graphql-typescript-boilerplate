import { SPARKPOST_API_KEY, NODE_ENV } from "../process-variables";
import * as SparkPost from "sparkpost";

let key = "123";
if (NODE_ENV !== "test") {
  key = SPARKPOST_API_KEY;
}
const client = new SparkPost(key);

export const sendEmail = async (recipient: string, url: string) => {
  const response = await client.transmissions.send({
    options: {
      sandbox: true
    },
    content: {
      from: "testing@sparkpostbox.com",
      subject: "Confirm Email!",
      html: `<html>
            <body>
                <p>Testing SparkPost - the world's most awesomest email service!</p>
                <a href="${url}"> Confirm account </a>
            </body>
           </html>`
    },
    recipients: [{ address: recipient }]
  });
  console.log(response);
};
