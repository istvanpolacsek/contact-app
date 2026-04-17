import { db } from './client';
import { contacts } from './schema';

export async function initializeDatabase(): Promise<{
  success: boolean;
  message: string;
  timestamp: string;
}> {
  try {
    // Check if the contacts table exists by trying to query it
    await db.select().from(contacts).limit(1);
    
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
