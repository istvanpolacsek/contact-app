import { type FC, type SubmitEventHandler, useRef } from 'react';
import {
  ContactDialogActionsStyled,
  ContactDialogStyled,
} from './ContactDialog.styles';
import Headline from '../headline/Headline';
import Input from '../input/Input';
import Button from '../button/Button';

export interface ContactDialogProps {
  userId?: string;
}

const ContactDialog: FC<ContactDialogProps> = ({ userId }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const title = userId ? 'Edit contact' : 'Add contact';

  const handleSubmit: SubmitEventHandler = (e) => {
    e.preventDefault();
  };

  return (
    <ContactDialogStyled ref={formRef} onSubmit={handleSubmit}>
      <Headline level={2}>{title}</Headline>
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
