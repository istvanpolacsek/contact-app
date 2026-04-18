import { type ChangeEventHandler, type FC, type MouseEventHandler, useRef, useState } from 'react';
import imageCompression from 'browser-image-compression';
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
import { type IconVariants } from '..';
import { useRouter } from 'next/navigation';
import { useClickOutside, useTranslations } from '../..';

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
  const t = useTranslations();
  const formRef = useRef<HTMLFormElement>(null);
  const profilePictureInputRef = useRef<HTMLInputElement>(null);
  const compressedFileRef = useRef<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(profilePictureUrl);
  const [isCompressing, setIsCompressing] = useState(false);
  const { push } = useRouter();
  const title = `${t[mode]} ${t[isDefaultUser ? 'defaultContact' : 'contact']}`;
  const buttonTitle = t[previewUrl ? 'editPicture' : 'addPicture'];
  const dynamicButtonTitle = isCompressing ? t['processing'] : buttonTitle;
  const buttonIcon: IconVariants = previewUrl ? 'change' : 'add';

  const handleProfilePictureButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
    const { current: input } = profilePictureInputRef;

    if (!input) {
      return;
    }

    input.value = '';
    input.click();
  };

  const handleProfilePictureChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsCompressing(true);

    try {
      const maxSizeMB = 1;
      const maxWidthOrHeight = 1024;

      const compressedFile = await imageCompression(file, {
        maxSizeMB,
        maxWidthOrHeight,
        useWebWorker: true,
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
        setIsCompressing(false);
      };
      reader.readAsDataURL(compressedFile);

      compressedFileRef.current = compressedFile as File;
    } catch (error) {
      console.error('Image compression error:', error);
      compressedFileRef.current = null;
      setPreviewUrl(undefined);
      setIsCompressing(false);
    }
  };

  const handleDeletePicture: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const { current: input } = profilePictureInputRef;

    if (input) {
      input.value = '';
    }

    compressedFileRef.current = null;
    setPreviewUrl(undefined);
  };

  const handleCloseDialog = () => push('/');

  const handleSubmit = async (formData: FormData) => {
    if (compressedFileRef.current) {
      formData.set('photo', compressedFileRef.current);
    }

    await onSubmit(formData);
    handleCloseDialog();
  };

  useClickOutside(formRef, handleCloseDialog);

  return (
    <ContactDialogStyled ref={formRef} action={handleSubmit}>
      <Headline level={2}>{title}</Headline>
      <ContactDialogPhotoEditStyled>
        <ContactDialogPhotoInputStyled
          name="photo"
          ref={profilePictureInputRef}
          type="file"
          accept="image/*"
          aria-label="Choose a profile picture"
          onChange={handleProfilePictureChange}
        />
        <ContactDialogPhotoWrapperStyled>
          <Image src={previewUrl} alt={t['profilePicture']} />
        </ContactDialogPhotoWrapperStyled>
        <ContactDialogPhotoActionsStyled>
          <Button
            type="button"
            icon={buttonIcon}
            onClick={handleProfilePictureButtonClick}
            disabled={isCompressing}
          >
            {dynamicButtonTitle}
          </Button>
          {!!previewUrl && (
            <Button
              type="button"
              icon="delete"
              aria-label="Remove picture"
              onClick={handleDeletePicture}
              disabled={isCompressing}
              title={t['deletePicture']}
            />
          )}
        </ContactDialogPhotoActionsStyled>
      </ContactDialogPhotoEditStyled>
      <Input
        id="name"
        name="name"
        type="string"
        label={t['name']}
        placeholder="Jamie Wright"
        defaultValue={name}
      />
      <Input
        id="phoneNumber"
        name="phoneNumber"
        type="tel"
        label={t['phoneNumber']}
        placeholder="+01 234 5678"
        defaultValue={phoneNumber}
      />
      <Input
        id="email"
        name="email"
        type="email"
        label={t['email']}
        placeholder="jamie@wright.not"
        defaultValue={email}
      />
      <input hidden name="isDefault" defaultValue={`${isDefaultUser}`} />
      <ContactDialogActionsStyled>
        <Button type="button" variant="secondary" onClick={handleCloseDialog}>
          {t['cancel']}
        </Button>
        <Button type="submit">{t['done']}</Button>
      </ContactDialogActionsStyled>
    </ContactDialogStyled>
  );
};

export default ContactDialog;
