import { ApolloServer } from '@apollo/server';
import fastifyApollo, {
  fastifyApolloDrainPlugin,
} from '@as-integrations/fastify';
import { DateTimeTypeDefinition, DateTimeResolver } from 'graphql-scalars';
import typeDefs from './typeDefs.js';
import resolvers from './resolvers.js';

export default async function startServer(app) {
  const server = new ApolloServer({
    typeDefs: { DateTime: DateTimeTypeDefinition, ...typeDefs },
    resolvers: { DateTime: DateTimeResolver, ...resolvers },
    plugins: [fastifyApolloDrainPlugin(app)],
  });
  await server.start();
  app.register(fastifyApollo(server), { path: '/gql' });
}
