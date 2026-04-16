import {
  type FC,
  type MouseEventHandler,
  type SubmitEventHandler,
  useRef,
} from 'react';
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

export interface ContactDialogProps {
  mode: 'add' | 'edit';
  name?: string;
  phoneNumber?: string;
  email?: string;
  profilePictureUrl?: string;
}

const ContactDialog: FC<ContactDialogProps> = ({ mode, profilePictureUrl }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const profilePictureInputRef = useRef<HTMLInputElement>(null);
  const title = startCase(`${mode} contact`);
  const buttonTitle = profilePictureUrl ? 'Change picture' : 'Add picture';
  const buttonIcon: IconVariants = profilePictureUrl ? 'change' : 'add';

  const handleSubmit: SubmitEventHandler = (e) => {
    e.preventDefault();
  };

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

  return (
    <ContactDialogStyled ref={formRef} onSubmit={handleSubmit}>
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
      <Input name="name" type="string" placeholder="Jamie Wright" />
      <Input name="phoneNumber" type="tel" placeholder="+01 234 5678" />
      <Input name="email" type="email" placeholder="jamie@wright.not" />
      <ContactDialogActionsStyled>
        <Button type="button" variant="secondary">
          Cancel
        </Button>
        <Button type="submit">Done</Button>
      </ContactDialogActionsStyled>
    </ContactDialogStyled>
  );
};

export default ContactDialog;
