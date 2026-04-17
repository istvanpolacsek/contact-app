import { type FC, memo } from 'react';
import { useSearchParams } from 'next/navigation';
import ContactDialog from '../contact-dialog/ContactDialog';
import Backdrop from '../backdrop/Backdrop';
import { type Contact } from '@contact-app/types';

export interface DialogProps {
  onSubmit: (formData: FormData) => Promise<void>;
  defaultValues?: Contact | null;
}

const Dialog: FC<DialogProps> = ({ onSubmit, defaultValues }) => {
  const params = useSearchParams();
  const dialog = params.get('d');
  const id = params.get('id');
  const isDefault = params.get('default') === 'true';
  const isDialogVisible = dialog === 'contact';

  return (
    <Backdrop isVisible={isDialogVisible}>
      <ContactDialog
        mode={id ? 'edit' : 'add'}
        onSubmit={onSubmit}
        isDefaultUser={isDefault}
        {...defaultValues}
      />
    </Backdrop>
  );
};

export default memo(Dialog);
