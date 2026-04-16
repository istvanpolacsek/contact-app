import { NextResponse, type NextRequest } from 'next/server';
import { query } from '../../../lib/db';
import {
  contactSchema,
  type Contact,
  type ApiResponse,
} from '@contact-app/types';
import { initializeDatabase } from '../../../lib/db/init';

function formatContact(row: any): Contact {
  return {
    id: row.id,
    name: row.name,
    phoneNumber: row.phone_number,
    email: row.email,
    profilePictureUrl: row.profile_picture_url,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
}

export async function GET() {
  try {
    await initializeDatabase();
    const result = await query(
      'SELECT * FROM contacts ORDER BY created_at DESC',
    );
    const contacts = result.rows.map(formatContact);
    return NextResponse.json<ApiResponse<Contact[]>>({
      success: true,
      data: contacts,
    });
  } catch (error) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error:
          error instanceof Error ? error.message : 'Failed to fetch contacts',
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await initializeDatabase();
    const body = await request.json();

    const parsed = contactSchema
      .omit({ id: true, createdAt: true, updatedAt: true })
      .parse(body);

    const result = await query(
      `INSERT INTO contacts (name, phone_number, email, profile_picture_url)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [
        parsed.name,
        parsed.phoneNumber || null,
        parsed.email || null,
        parsed.profilePictureUrl || null,
      ],
    );

    const contact = formatContact(result.rows[0]);
    return NextResponse.json<ApiResponse<Contact>>(
      {
        success: true,
        data: contact,
      },
      { status: 201 },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to create contact';
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: message,
      },
      {
        status:
          error instanceof Error && error.message.includes('validation')
            ? 400
            : 500,
      },
    );
  }
}
