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
import Popover from '../popover/Popover';
import { type ActionItem } from '..';
import { type Variants } from 'motion/react';
import { type Contact } from '@contact-app/types';
import { useRouter } from 'next/navigation';

export interface ContactListItemProps extends Contact {
  onDeleteContact: (id: number) => void;
}

const ContactListItem: FC<ContactListItemProps> = ({
  id,
  name,
  profilePictureUrl,
  phoneNumber,
  onDeleteContact,
}) => {
  const { push } = useRouter();
  const actionsVariants: Variants = {
    rest: { opacity: 0 },
    hovered: {
      opacity: 1,
      transition: { duration: 0.2, ease: 'easeOut' },
    },
  };

  const handleEdit = () => push(`?d=contact&id=${id}`);

  const popoverActions: ActionItem[] = [
    { name: 'Edit', onClick: handleEdit, icon: 'settings' },
    { name: 'Favourite', onClick: () => null, icon: 'favourite' },
    { name: 'Remove', onClick: () => onDeleteContact(id), icon: 'delete' },
  ];

  return (
    <ContactListItemStyled initial="rest" animate="rest" whileHover="hovered">
      <ContactListItemImageStyled>
        <Image src={profilePictureUrl} alt={name} />
      </ContactListItemImageStyled>
      <Headline level={3}>{name}</Headline>
      {phoneNumber && (
        <ContactListItemPhoneStyled href={`tel:${phoneNumber}`} aria-label={`Call ${name}`}>
          {phoneNumber}
        </ContactListItemPhoneStyled>
      )}
      <ContactListItemActionsStyled variants={actionsVariants}>
        <Button icon="mute" variant="secondary" />
        <Button icon="call" variant="secondary" />
        <Popover actions={popoverActions} placement="bottom-right" />
      </ContactListItemActionsStyled>
    </ContactListItemStyled>
  );
};

export default ContactListItem;
