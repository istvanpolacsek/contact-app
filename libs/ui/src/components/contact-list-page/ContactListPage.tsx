import {
  ContactListSectionActionStyled,
  ContactListSectionStyled,
  ContactListUlStyled,
} from './ContactListPage.styles';
import { type Contact, type ContactInput } from '@contact-app/types';
import { type FC } from 'react';
import { map } from 'lodash';
import ContactListItem from '../contact-list-item/ContactListItem';
import ContactListPageHeader from './ContactListPageHeader';
import Button from '../button/Button';

export interface ContactListPageProps {
  contacts: Contact[];
  profile: ContactInput;
  title: string;
  addNewTitle: string;
}

const ContactListPage: FC<ContactListPageProps> = ({
  contacts,
  title,
  addNewTitle,
  profile,
}) => {
  return (
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
      <ContactListUlStyled>
        {map(contacts, ({ id, ...rest }) => (
          <ContactListItem key={id} {...rest} />
        ))}
      </ContactListUlStyled>
    </ContactListSectionStyled>
  );
};

export default ContactListPage;
