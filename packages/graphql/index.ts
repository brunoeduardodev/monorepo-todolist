import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { resolvers } from "@generated/type-graphql";

import path from "path";

export * from "@generated/type-graphql";
export { PrismaClient } from "@prisma/client";

export const makeSchema = async () => {
  const schema = await buildSchema({
    resolvers,
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
    validate: false,
  });

  return schema;
};
