import { type FC, memo } from 'react';
import { ContactListUlStyled } from './ContactListPage.styles';
import { isEqual, map, omit } from 'lodash';
import ContactListItem from '../contact-list-item/ContactListItem';
import { type Contact } from '@contact-app/types';

export interface ContactListPageUlProps {
  contacts: Contact[];
  onDeleteContact: (id: number) => Promise<void>;
}

const ContactListPageUl: FC<ContactListPageUlProps> = ({
  contacts,
  onDeleteContact,
}) => (
  <ContactListUlStyled>
    {map(contacts, ({ id, ...rest }) => (
      <ContactListItem
        key={id}
        id={id}
        {...rest}
        onDeleteContact={onDeleteContact}
      />
    ))}
  </ContactListUlStyled>
);

export default memo(ContactListPageUl, (prevProps, nextProps) =>
  isEqual(
    omit(prevProps, ['onDeleteContact']),
    omit(nextProps, ['onDeleteContact']),
  ),
);
