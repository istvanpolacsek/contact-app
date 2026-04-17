import {
  ContactListSectionActionStyled,
  ContactListSectionStyled,
} from './ContactListPage.styles';
import { type Contact } from '@contact-app/types';
import { type FC } from 'react';
import ContactListPageHeader from './ContactListPageHeader';
import Button from '../button/Button';
import ContactListPageUl from './ContactListPageUl';

export interface ContactListPageProps {
  contacts: Contact[];
  profile: Contact;
  title: string;
  addNewTitle: string;
  onDeleteContact: (id: number) => Promise<void>;
}

const ContactListPage: FC<ContactListPageProps> = ({
  contacts,
  title,
  addNewTitle,
  profile,
  onDeleteContact,
}) => (
  <ContactListSectionStyled>
    <ContactListSectionActionStyled $justify="end">
      <Button variant="secondary" icon="backArrow" />
    </ContactListSectionActionStyled>
    <ContactListPageHeader
      title={title}
      addNewTitle={addNewTitle}
      {...profile}
    />
    <ContactListSectionActionStyled $justify="start">
      <Button variant="secondary" icon="lightMode" />
    </ContactListSectionActionStyled>
    <ContactListPageUl contacts={contacts} onDeleteContact={onDeleteContact} />
  </ContactListSectionStyled>
);

export default ContactListPage;
