import { type FC } from 'react';
import {
  ContactListItemActionsStyled,
  ContactListItemImageStyled,
  ContactListItemPhoneStyled,
  ContactListItemStyled,
} from './ContactListItem.styles';
import Image from '../image/Image';
import Headline from '../headline/Headline';
import Button from '../button/Button';

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
      <Headline level={3}>{name}</Headline>
      {phoneNumber && (
        <ContactListItemPhoneStyled
          href={`tel:${phoneNumber}`}
          aria-label={`Call ${name}`}
        >
          {phoneNumber}
        </ContactListItemPhoneStyled>
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
