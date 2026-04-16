import { query } from '../db';

export async function initializeDatabase(): Promise<{
  success: boolean;
  message: string;
  timestamp: string;
}> {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone_number VARCHAR(20),
        email VARCHAR(255),
        profile_picture_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    return {
      success: true,
      message: 'Database initialized successfully',
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Database initialization error', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    };
  }
}
