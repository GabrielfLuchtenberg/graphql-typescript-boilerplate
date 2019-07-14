import { generateNamespace } from "@gql2ts/from-schema";
import * as fs from "fs";
import * as path from "path";
import { generateSchema } from "../utils/generate-schema";

const typescriptFiles = generateNamespace("GQL", generateSchema());

fs.writeFile(
  path.join(__dirname, "../types/schema.d.ts"),
  typescriptFiles,
  err => console.log(err)
);
