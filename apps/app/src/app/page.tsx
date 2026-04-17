import {
  createContact,
  fetchAllContacts,
  updateContact,
  deleteContact,
  fetchDefaultContact,
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

    const contact = reduce(
      ['name', 'email', 'phoneNumber', 'profilePictureUrl', 'isDefault'],
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
        {...(defaultContact
          ? { profile: defaultContact }
          : { profile: { name: '' } as Contact })}
      />
      <Dialog onSubmit={submitHandler} defaultValues={defaultValues} />
    </>
  );
}
