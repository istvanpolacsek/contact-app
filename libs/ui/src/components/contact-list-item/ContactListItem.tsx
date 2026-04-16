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
import { type ActionItem } from '..';
import { type Variants } from 'motion/react';
import Popover from '../popover/Popover';

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
  const actionsVariants: Variants = {
    rest: { opacity: 0 },
    hovered: {
      opacity: 1,
      transition: { duration: 0.2, ease: 'easeOut' },
    },
  };

  const popoverActions: ActionItem[] = [
    { name: 'Edit', onClick: () => null, icon: 'settings' },
    { name: 'Favourite', onClick: () => null, icon: 'favourite' },
    { name: 'Remove', onClick: () => null, icon: 'delete' },
  ];

  return (
    <ContactListItemStyled initial="rest" animate="rest" whileHover="hovered">
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
      <ContactListItemActionsStyled variants={actionsVariants}>
        <Button icon="mute" variant="secondary" />
        <Button icon="call" variant="secondary" />
        <Popover actions={popoverActions} placement="bottom-left" />
      </ContactListItemActionsStyled>
    </ContactListItemStyled>
  );
};

export default ContactListItem;
