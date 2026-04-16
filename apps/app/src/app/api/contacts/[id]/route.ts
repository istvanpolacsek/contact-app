import { NextResponse, type NextRequest } from 'next/server';
import { db } from '../../../../lib/db/client';
import { contacts } from '../../../../lib/db/schema';
import {
  contactSchema,
  type Contact,
  type ApiResponse,
} from '@contact-app/types';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const contactId = parseInt(id, 10);

    if (isNaN(contactId)) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Invalid contact ID' },
        { status: 400 },
      );
    }

    const result = await db
      .select()
      .from(contacts)
      .where(eq(contacts.id, contactId));

    if (result.length === 0) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Contact not found' },
        { status: 404 },
      );
    }

    return NextResponse.json<ApiResponse<Contact>>({
      success: true,
      data: result[0] as Contact,
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

    const result = await db
      .update(contacts)
      .set({
        name: parsed.name,
        phoneNumber: parsed.phoneNumber || null,
        email: parsed.email || null,
        profilePictureUrl: parsed.profilePictureUrl || null,
        updatedAt: new Date(),
      })
      .where(eq(contacts.id, contactId))
      .returning();

    if (result.length === 0) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Contact not found' },
        { status: 404 },
      );
    }

    return NextResponse.json<ApiResponse<Contact>>({
      success: true,
      data: result[0] as Contact,
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
    const { id } = await params;
    const contactId = parseInt(id, 10);

    if (isNaN(contactId)) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Invalid contact ID' },
        { status: 400 },
      );
    }

    const result = await db
      .delete(contacts)
      .where(eq(contacts.id, contactId))
      .returning({ id: contacts.id });

    if (result.length === 0) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Contact not found' },
        { status: 404 },
      );
    }

    return NextResponse.json<ApiResponse<{ id: number; deleted: boolean }>>({
      success: true,
      data: { id: result[0].id, deleted: true },
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
