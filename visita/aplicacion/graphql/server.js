import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { DateTimeTypeDefinition, DateTimeResolver } from 'graphql-scalars';
import express from 'express';
import http from 'http';
import cors from 'cors';
import typeDefs from './typeDefs.js';
import resolvers from './resolvers.js';

export default async function startServer(app) {
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs: { DateTime: DateTimeTypeDefinition, ...typeDefs },
    resolvers: { DateTime: DateTimeResolver, ...resolvers },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  app.use(
    '/graphql',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res }),
    }),
  );
  // await new Promise((resolve) => httpServer.listen({ port: 3002 }, resolve));
  // console.log('🤖 Server iniciado en: http://localhost:3002/graphql');
}
