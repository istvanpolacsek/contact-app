import { type FC } from 'react';
import { type Contact } from '@contact-app/types';
import Button from '../button/Button';
import { ProfileActionsStyled } from './ProfileActions.styles';
import Image from '../image/Image';
import { useRouter } from 'next/navigation';

const ProfileActions: FC<Contact> = ({ profilePictureUrl, name, id }) => {
  const { push } = useRouter();

  const searchParams = new URLSearchParams({
    d: 'contact',
    default: 'true',
    ...(id ? { id: String(id) } : {}),
  });

  const handleClick = () => push(`?${searchParams.toString()}`);

  return (
    <Button variant="secondary" onClick={handleClick}>
      <ProfileActionsStyled>
        <Image src={profilePictureUrl} alt={name} />
      </ProfileActionsStyled>
    </Button>
  );
};

export default ProfileActions;
