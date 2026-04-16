import { Pool, type PoolClient } from 'pg';

const connectionString =
  process.env.DATABASE_URL ||
  `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOSTNAME}:${process.env.DB_PPORT}/${process.env.DB_DATABASE}`;

const pool = new Pool({
  connectionString,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

export async function query(text: string, params?: unknown[]) {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Database query error', error);
    throw error;
  }
}

export async function getClient(): Promise<PoolClient> {
  return pool.connect();
}

export async function testConnection(): Promise<{
  success: boolean;
  message: string;
  timestamp: string;
  version?: string;
}> {
  try {
    const result = await query('SELECT version()');
    return {
      success: true,
      message: 'Database connection successful',
      timestamp: new Date().toISOString(),
      version: result.rows[0]?.version,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    };
  }
}

export async function closePool(): Promise<void> {
  await pool.end();
}

export default pool;
