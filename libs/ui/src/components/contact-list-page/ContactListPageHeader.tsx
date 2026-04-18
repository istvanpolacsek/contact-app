import { type FC } from 'react';
import {
  ContactListPageHeaderActionsStyled,
  ContactListPageHeaderSecondaryActionsStyled,
  ContactListPageHeaderStyled,
} from './ContactListPage.styles';
import Headline from '../headline/Headline';
import Button from '../button/Button';
import ProfileActions from '../profile-action/ProfileActions';
import { type Contact } from '@contact-app/types';
import { useRouter } from 'next/navigation';
import { useTranslations } from '../..';

const ContactListPageHeader: FC<Contact> = (props) => {
  const { push } = useRouter();
  const t = useTranslations();

  const handleAddNewClick = () => push(`?d=contact`);

  return (
    <ContactListPageHeaderStyled>
      <Headline>{t['appTitle']}</Headline>
      <ContactListPageHeaderActionsStyled>
        <ContactListPageHeaderSecondaryActionsStyled>
          <Button variant="secondary" icon="settings" title={t['settings']} />
          <ProfileActions {...props} />
        </ContactListPageHeaderSecondaryActionsStyled>
        <Button variant="special" icon="add" onClick={handleAddNewClick}>
          {t['addNewTitle']}
        </Button>
      </ContactListPageHeaderActionsStyled>
    </ContactListPageHeaderStyled>
  );
};

export default ContactListPageHeader;
