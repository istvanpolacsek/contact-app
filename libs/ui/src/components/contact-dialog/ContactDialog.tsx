import { type FC, type MouseEventHandler, useRef } from 'react';
import {
  ContactDialogActionsStyled,
  ContactDialogPhotoActionsStyled,
  ContactDialogPhotoEditStyled,
  ContactDialogPhotoInputStyled,
  ContactDialogPhotoWrapperStyled,
  ContactDialogStyled,
} from './ContactDialog.styles';
import Headline from '../headline/Headline';
import Input from '../input/Input';
import Button from '../button/Button';
import Image from '../image/Image';
import { startCase } from 'lodash';
import { type IconVariants } from '..';
import { useRouter } from 'next/navigation';

export interface ContactDialogProps {
  mode: 'add' | 'edit';
  name?: string;
  phoneNumber?: string;
  email?: string;
  profilePictureUrl?: string;
  isDefaultUser?: boolean;
  onSubmit: (formData: FormData) => Promise<void>;
}

const ContactDialog: FC<ContactDialogProps> = ({
  mode,
  profilePictureUrl,
  onSubmit,
  name = '',
  email,
  phoneNumber,
  isDefaultUser = false,
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const profilePictureInputRef = useRef<HTMLInputElement>(null);
  const { push } = useRouter();
  const title = startCase(`${mode} contact`);
  const buttonTitle = profilePictureUrl ? 'Change picture' : 'Add picture';
  const buttonIcon: IconVariants = profilePictureUrl ? 'change' : 'add';

  const handleProfilePictureButtonClick: MouseEventHandler<
    HTMLButtonElement
  > = () => {
    const input = profilePictureInputRef.current;

    if (!input) {
      return;
    }

    input.value = '';
    input.click();
  };

  const handleCloseDialog = () => push('/');

  const handleSubmit = async (formData: FormData) => {
    await onSubmit(formData);
    handleCloseDialog();
  };

  return (
    <ContactDialogStyled ref={formRef} action={handleSubmit}>
      <Headline level={2}>{title}</Headline>
      <ContactDialogPhotoEditStyled>
        <ContactDialogPhotoInputStyled
          ref={profilePictureInputRef}
          type="file"
          accept="image/*"
          aria-label="Choose a profile picture"
        />
        <ContactDialogPhotoWrapperStyled>
          <Image src={profilePictureUrl} alt="Profile picture preview" />
        </ContactDialogPhotoWrapperStyled>
        <ContactDialogPhotoActionsStyled>
          <Button
            type="button"
            icon={buttonIcon}
            onClick={handleProfilePictureButtonClick}
          >
            {buttonTitle}
          </Button>
          {!!profilePictureUrl && (
            <Button type="button" icon="delete" aria-label="Remove picture" />
          )}
        </ContactDialogPhotoActionsStyled>
      </ContactDialogPhotoEditStyled>
      <Input
        id="name"
        name="name"
        type="string"
        placeholder="Jamie Wright"
        defaultValue={name}
      />
      <Input
        id="phoneNumber"
        name="phoneNumber"
        type="tel"
        placeholder="+01 234 5678"
        defaultValue={phoneNumber}
      />
      <Input
        id="email"
        name="email"
        type="email"
        placeholder="jamie@wright.not"
        defaultValue={email}
      />
      <input hidden name="isDefault" defaultValue={`${isDefaultUser}`} />
      <ContactDialogActionsStyled>
        <Button type="button" variant="secondary" onClick={handleCloseDialog}>
          Cancel
        </Button>
        <Button type="submit">Done</Button>
      </ContactDialogActionsStyled>
    </ContactDialogStyled>
  );
};

export default ContactDialog;
