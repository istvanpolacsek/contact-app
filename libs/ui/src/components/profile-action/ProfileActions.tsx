import { type FC } from 'react';
import { type ContactInput } from '@contact-app/types';
import Button from '../button/Button';
import { ProfileActionsStyled } from './ProfileActions.styles';
import Image from '../image/Image';

const ProfileActions: FC<ContactInput> = ({ profilePictureUrl, name }) => {
  return (
    <Button variant="secondary">
      <ProfileActionsStyled>
        <Image src={profilePictureUrl} alt={name} />
      </ProfileActionsStyled>
    </Button>
  );
};

export default ProfileActions;
