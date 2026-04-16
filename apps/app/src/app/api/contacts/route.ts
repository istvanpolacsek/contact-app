import { NextResponse } from 'next/server';
import { db } from '../../../lib/db/client';
import { contacts } from '../../../lib/db/schema';
import {
  contactSchema,
  type Contact,
  type ApiResponse,
} from '@contact-app/types';
import { desc } from 'drizzle-orm';

export async function GET() {
  try {
    const result = await db
      .select()
      .from(contacts)
      .orderBy(desc(contacts.createdAt));

    return NextResponse.json<ApiResponse<Contact[]>>({
      success: true,
      data: result as Contact[],
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

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsed = contactSchema
      .omit({ id: true, createdAt: true, updatedAt: true })
      .parse(body);

    const [result] = await db
      .insert(contacts)
      .values({
        name: parsed.name,
        phoneNumber: parsed.phoneNumber || null,
        email: parsed.email || null,
        profilePictureUrl: parsed.profilePictureUrl || null,
      })
      .returning();

    return NextResponse.json<ApiResponse<Contact>>(
      {
        success: true,
        data: result as Contact,
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
