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

export interface ContactListPageHeaderProps extends Contact {
  title: string;
  addNewTitle: string;
}

const ContactListPageHeader: FC<ContactListPageHeaderProps> = ({
  title,
  addNewTitle,
  ...rest
}) => {
  const { push } = useRouter();

  const handleAddNewClick = () => push(`?d=contact`);

  return (
    <ContactListPageHeaderStyled>
      <Headline>{title}</Headline>
      <ContactListPageHeaderActionsStyled>
        <ContactListPageHeaderSecondaryActionsStyled>
          <Button variant="secondary" icon="settings" />
          <ProfileActions {...rest} />
        </ContactListPageHeaderSecondaryActionsStyled>
        <Button variant="special" icon="add" onClick={handleAddNewClick}>
          {addNewTitle}
        </Button>
      </ContactListPageHeaderActionsStyled>
    </ContactListPageHeaderStyled>
  );
};

export default ContactListPageHeader;
