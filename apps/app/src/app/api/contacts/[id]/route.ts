import { NextResponse, type NextRequest } from 'next/server';
import { query } from '../../../../lib/db';
import {
  contactSchema,
  type Contact,
  type ApiResponse,
} from '@contact-app/types';
import { initializeDatabase } from '../../../../lib/db/init';

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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await initializeDatabase();
    const { id } = await params;
    const contactId = parseInt(id, 10);

    if (isNaN(contactId)) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Invalid contact ID' },
        { status: 400 },
      );
    }

    const result = await query('SELECT * FROM contacts WHERE id = $1', [
      contactId,
    ]);

    if (result.rows.length === 0) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Contact not found' },
        { status: 404 },
      );
    }

    const contact = formatContact(result.rows[0]);
    return NextResponse.json<ApiResponse<Contact>>({
      success: true,
      data: contact,
    });
  } catch (error) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error:
          error instanceof Error ? error.message : 'Failed to fetch contact',
      },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await initializeDatabase();
    const { id } = await params;
    const contactId = parseInt(id, 10);

    if (isNaN(contactId)) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Invalid contact ID' },
        { status: 400 },
      );
    }

    const body = await request.json();
    const parsed = contactSchema
      .omit({ id: true, createdAt: true, updatedAt: true })
      .parse(body);

    const result = await query(
      `UPDATE contacts 
       SET name = $1, phone_number = $2, email = $3, profile_picture_url = $4, updated_at = CURRENT_TIMESTAMP
       WHERE id = $5
       RETURNING *`,
      [
        parsed.name,
        parsed.phoneNumber || null,
        parsed.email || null,
        parsed.profilePictureUrl || null,
        contactId,
      ],
    );

    if (result.rows.length === 0) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Contact not found' },
        { status: 404 },
      );
    }

    const contact = formatContact(result.rows[0]);
    return NextResponse.json<ApiResponse<Contact>>({
      success: true,
      data: contact,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to update contact';
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await initializeDatabase();
    const { id } = await params;
    const contactId = parseInt(id, 10);

    if (isNaN(contactId)) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Invalid contact ID' },
        { status: 400 },
      );
    }

    const result = await query(
      'DELETE FROM contacts WHERE id = $1 RETURNING id',
      [contactId],
    );

    if (result.rows.length === 0) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Contact not found' },
        { status: 404 },
      );
    }

    return NextResponse.json<ApiResponse<{ id: number; deleted: boolean }>>({
      success: true,
      data: { id: result.rows[0].id, deleted: true },
    });
  } catch (error) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error:
          error instanceof Error ? error.message : 'Failed to delete contact',
      },
      { status: 500 },
    );
  }
}
