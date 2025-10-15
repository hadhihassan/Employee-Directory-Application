import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import fs from 'fs';
import path from 'path';
import { resolvers } from './graphql/resolvers.ts';
import { connectDB } from './config/database.ts';
import envConfig from './config/config.ts';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function start() {
  await connectDB();
  const typeDefs = fs.readFileSync(path.join(__dirname, 'graphql', 'schema.graphql'), 'utf8');

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(envConfig.port) },
    context: async () => ({}),
  });

  console.log(`Server running at \t ${url}`);
}

start().catch(err => {
  console.error('Failed to start server', err);
  process.exit(1);
});
