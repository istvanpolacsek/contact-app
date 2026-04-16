import { NextResponse } from 'next/server';
import { testConnection } from '../../../lib/db';
import { initializeDatabase } from '../../../lib/db/init';

export async function GET() {
  try {
    const dbStatus = await testConnection();
    const initStatus = await initializeDatabase();

    return NextResponse.json(
      {
        status: 'ok',
        database: dbStatus,
        initialization: initStatus,
        timestamp: new Date().toISOString(),
      },
      { status: dbStatus.success ? 200 : 503 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
