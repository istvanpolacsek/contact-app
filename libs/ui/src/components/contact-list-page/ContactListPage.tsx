import { ContactListSectionActionStyled, ContactListSectionStyled } from './ContactListPage.styles';
import { type Contact } from '@contact-app/types';
import { type FC } from 'react';
import ContactListPageHeader from './ContactListPageHeader';
import Button from '../button/Button';
import ContactListPageUl from './ContactListPageUl';
import { useTranslations } from '../../hooks';

export interface ContactListPageProps {
  contacts: Contact[];
  profile: Contact;
  onDeleteContact: (id: number) => Promise<void>;
}

const ContactListPage: FC<ContactListPageProps> = ({
  contacts,

  profile,
  onDeleteContact,
}) => {
  const t = useTranslations();

  return (
    <ContactListSectionStyled>
      <ContactListSectionActionStyled $justify="end" $justifyMobile="start">
        <Button variant="secondary" icon="backArrow" title={t['goBack']} />
      </ContactListSectionActionStyled>
      <ContactListPageHeader {...profile} />
      <ContactListSectionActionStyled $justify="start" $justifyMobile="end">
        <Button variant="secondary" icon="lightMode" title={t['lightMode']} />
      </ContactListSectionActionStyled>
      <ContactListPageUl contacts={contacts} onDeleteContact={onDeleteContact} />
    </ContactListSectionStyled>
  );
};

export default ContactListPage;
