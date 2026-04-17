import { type FC } from 'react';
import {
  ContactListPageHeaderActionsStyled,
  ContactListPageHeaderSecondaryActionsStyled,
  ContactListPageHeaderStyled,
} from './ContactListPage.styles';
import Headline from '../headline/Headline';
import Button from '../button/Button';
import ProfileActions from '../profile-action/ProfileActions';
import { type ContactInput } from '@contact-app/types';

export interface ContactListPageHeaderProps extends ContactInput {
  title: string;
  addNewTitle: string;
}

const ContactListPageHeader: FC<ContactListPageHeaderProps> = ({
  title,
  addNewTitle,
  ...rest
}) => {
  return (
    <ContactListPageHeaderStyled>
      <Headline>{title}</Headline>
      <ContactListPageHeaderActionsStyled>
        <ContactListPageHeaderSecondaryActionsStyled>
          <Button variant="secondary" icon="settings" />
          <ProfileActions {...rest} />
        </ContactListPageHeaderSecondaryActionsStyled>
        <Button variant="special" icon="add">
          {addNewTitle}
        </Button>
      </ContactListPageHeaderActionsStyled>
    </ContactListPageHeaderStyled>
  );
};

export default ContactListPageHeader;
