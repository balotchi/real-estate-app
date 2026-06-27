import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  datasource: {
    // The Prisma CLI requires a direct connection to push schemas
    url: env('DIRECT_URL'),
  },
});