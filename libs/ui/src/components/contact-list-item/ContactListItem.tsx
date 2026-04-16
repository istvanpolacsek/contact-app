import { type FC } from 'react';
import {
  ContactListItemActionsStyled,
  ContactListItemImageStyled,
  ContactListItemNameStyled,
  ContactListItemPhoneStyled,
  ContactListItemStyled,
} from './ContactListItem.styles';
import { Image, Button } from '..';

export interface ContactListItemProps {
  name: string;
  phoneNumber?: string;
  email?: string;
  profilePictureUrl?: string;
}

const ContactListItem: FC<ContactListItemProps> = ({
  name,
  profilePictureUrl,
  phoneNumber,
}) => {
  return (
    <ContactListItemStyled>
      <ContactListItemImageStyled>
        <Image src={profilePictureUrl} alt={name} />
      </ContactListItemImageStyled>
      <ContactListItemNameStyled>{name}</ContactListItemNameStyled>
      {phoneNumber && (
        <ContactListItemPhoneStyled>{phoneNumber}</ContactListItemPhoneStyled>
      )}
      <ContactListItemActionsStyled>
        <Button icon="mute" variant="secondary" />
        <Button icon="call" variant="secondary" />
        <Button icon="more" variant="secondary" />
      </ContactListItemActionsStyled>
    </ContactListItemStyled>
  );
};

export default ContactListItem;
