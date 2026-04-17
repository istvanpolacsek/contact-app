import { type FC, memo } from 'react';
import { useSearchParams } from 'next/navigation';
import ContactDialog from '../contact-dialog/ContactDialog';
import Backdrop from '../backdrop/Backdrop';

export interface DialogProps {
  onSubmit: (formData: FormData) => Promise<void>;
}

const Dialog: FC<DialogProps> = ({ onSubmit }) => {
  const params = useSearchParams();
  const dialog = params.get('d');
  const id = params.get('id');
  const isDialogVisible = dialog === 'contact';

  return (
    <Backdrop isVisible={isDialogVisible}>
      <ContactDialog
        mode={id ? 'edit' : 'add'}
        {...(id ? { id: Number(id) } : {})}
        onSubmit={onSubmit}
      />
    </Backdrop>
  );
};

export default memo(Dialog);
