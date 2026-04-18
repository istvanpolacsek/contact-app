import {
  createContact,
  fetchAllContacts,
  updateContact,
  deleteContact,
  fetchDefaultContact,
  uploadContactPhoto,
} from '../lib/actions';
import { ContactListPage, Dialog } from '@contact-app/ui';
import { type Contact, type ContactInput } from '@contact-app/types';
import { find, isFinite, reduce, toNumber } from 'lodash';

interface IndexProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function Index({ searchParams }: IndexProps) {
  const contacts = await fetchAllContacts();
  const defaultContact = await fetchDefaultContact();
  const { id, default: isDefaultFromParams } = await searchParams;
  const isDefault = isDefaultFromParams === 'true';
  const defaultValues = isDefault
    ? defaultContact
    : find(contacts, ({ id: contactId }) => contactId === toNumber(id));

  async function submitHandler(formData: FormData): Promise<void> {
    'use server';
    const isValidId = isFinite(toNumber(id));

    const serverAction = isValidId ? updateContact : createContact;

    const photoFile = formData.get('photo') as File | null;

    if (photoFile && photoFile.size > 0) {
      const buffer = await photoFile.arrayBuffer();
      const { success, data, error } = await uploadContactPhoto(Buffer.from(buffer));

      if (success && data) {
        formData.set('profilePictureUrl', data.photoSlug);
      } else {
        console.error('Photo upload failed:', error);
      }
    }

    const contact = reduce(
      ['name', 'email', 'phoneNumber', 'isDefault', 'profilePictureUrl'],
      (acc, key) => ({
        ...acc,
        [key]: formData.get(key),
      }),
      {} as ContactInput,
    );

    await serverAction(contact, toNumber(id));
  }

  async function deleteHandler(id: number): Promise<void> {
    'use server';

    await deleteContact(id);
  }

  return (
    <>
      <ContactListPage
        contacts={contacts}
        addNewTitle="Add contact"
        title="Contact App"
        onDeleteContact={deleteHandler}
        {...(defaultContact ? { profile: defaultContact } : { profile: { name: '' } as Contact })}
      />
      <Dialog onSubmit={submitHandler} defaultValues={defaultValues} />
    </>
  );
}
