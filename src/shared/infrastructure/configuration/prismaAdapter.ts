import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

// Puxar a URL de conexão do arquivo .env
const connectionUrl = process.env.DATABASE_URL;

if (!connectionUrl) {
  throw new Error('DATABASE_URL não está definida no arquivo .env');
}

// Criar um pool de conexões com a URL de conexão
const pool = new Pool({
  connectionString: connectionUrl,
});

// Criar o adapter Prisma para PostgreSQL
const adapter = new PrismaPg(pool);

export { adapter, pool, connectionUrl };
