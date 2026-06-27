import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const prismaClientSingleton = () => {
  // 1. Create a native Postgres connection pool using your database URL
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  
  // 2. Wrap it in Prisma's modern v7 driver adapter
  const adapter = new PrismaPg(pool);
  
  // 3. Pass the adapter straight into the client constructor
  return new PrismaClient({ adapter });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;