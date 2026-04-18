'use server';

import { db } from './db/client';
import { contacts } from './db/schema';
import { type ApiResponse, type Contact, type ContactInput } from '@contact-app/types';
import { eq, or, desc, isNull, asc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { uploadPhotoToS3 } from './s3';

// READ operations
export async function fetchAllContacts(): Promise<Contact[]> {
  try {
    const result = await db
      .select()
      .from(contacts)
      .where(or(eq(contacts.isDefault, false), isNull(contacts.isDefault)))
      .orderBy(desc(contacts.createdAt));

    return result as Contact[];
  } catch (error) {
    console.error('Failed to fetch contacts:', error);
    return [];
  }
}

export async function fetchDefaultContact(): Promise<Contact | null> {
  try {
    const [result] = await db
      .select()
      .from(contacts)
      .where(eq(contacts.isDefault, true))
      .orderBy(asc(contacts.createdAt));

    return (result as Contact) ?? null;
  } catch (error) {
    console.error('Failed to fetch default contact:', error);
    return null;
  }
}

// CREATE operation
export async function createContact(contactData: ContactInput): Promise<ApiResponse<Contact>> {
  try {
    const result = await db
      .insert(contacts)
      .values({
        name: contactData.name,
        phoneNumber: contactData.phoneNumber || null,
        email: contactData.email || null,
        profilePictureUrl: contactData.profilePictureUrl || null,
        isDefault: contactData.isDefault,
      })
      .returning();

    revalidatePath('/');
    return { success: true, data: result[0] as Contact };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create contact';
    console.error('Create contact error:', error);
    return { success: false, error: message };
  }
}

// UPDATE operation
export async function updateContact(
  contactData: ContactInput,
  id: number,
): Promise<ApiResponse<Contact>> {
  try {
    const result = await db
      .update(contacts)
      .set({
        name: contactData.name,
        phoneNumber: contactData.phoneNumber || null,
        email: contactData.email || null,
        profilePictureUrl: contactData.profilePictureUrl || null,
        updatedAt: new Date(),
        isDefault: contactData.isDefault,
      })
      .where(eq(contacts.id, id))
      .returning();

    if (result.length === 0) {
      return { success: false, error: 'Contact not found' };
    }

    revalidatePath('/');
    return { success: true, data: result[0] as Contact };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update contact';
    console.error('Update contact error:', error);
    return { success: false, error: message };
  }
}

// DELETE operation
export async function deleteContact(id: number): Promise<{
  success: boolean;
  data?: { id: number; deleted: boolean };
  error?: string;
}> {
  try {
    const result = await db
      .delete(contacts)
      .where(eq(contacts.id, id))
      .returning({ id: contacts.id });

    if (result.length === 0) {
      return { success: false, error: 'Contact not found' };
    }

    revalidatePath('/');
    return { success: true, data: { id: result[0].id, deleted: true } };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete contact';
    console.error('Delete contact error:', error);
    return { success: false, error: message };
  }
}

// UPLOAD operation
export async function uploadContactPhoto(
  buffer: Buffer,
): Promise<ApiResponse<{ photoUrl: string }>> {
  try {
    const fileName = `photo-${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;
    const photoUrl = await uploadPhotoToS3(buffer, fileName);

    return { success: true, data: { photoUrl } };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to upload photo';
    console.error('Upload photo error:', error);
    return { success: false, error: message };
  }
}
