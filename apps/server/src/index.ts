import "reflect-metadata";

import { makeSchema, PrismaClient } from "@packages/graphql";
import { ApolloServer } from "apollo-server";

interface Context {
  prisma: PrismaClient;
}

async function setup() {
  const schema = await makeSchema();
  const prisma = new PrismaClient();
  await prisma.$connect();

  const server = new ApolloServer({
    schema,
    context: (): Context => ({ prisma }),
    cache: "bounded",
  });

  const { port } = await server.listen(4000);
  console.log(`GraphQL is listening on ${port}!`);
}

setup();
