import { type FC, useMemo } from 'react';
import { type HTMLMotionProps } from 'motion/react';
import {
  InputContainerStyled,
  InputLabelStyled,
  InputStyled,
} from './Input.styles';
import { useTheme } from '@contact-app/theme';

export interface InputProps extends HTMLMotionProps<'input'> {
  label?: string;
  id?: string;
}

const Input: FC<InputProps> = ({ label, id, ...props }) => {
  const theme = useTheme();
  const inputId = useMemo(
    () => id || `input-${Math.random().toString(36).slice(2, 9)}`,
    [id],
  );

  const motionStyles: HTMLMotionProps<'input'> = {
    style: {
      backgroundColor: theme.palette.colors.grey[80],
      borderColor: theme.palette.colors.grey[60],
    },
    whileHover: {
      borderColor: theme.palette.colors.grey[30],
    },
    whileFocus: {
      backgroundColor: theme.palette.colors.grey[60],
      borderColor: theme.palette.colors.grey[10],
    },
  };

  return (
    <InputContainerStyled>
      {label && <InputLabelStyled htmlFor={inputId}>{label}</InputLabelStyled>}
      <InputStyled id={inputId} {...props} {...motionStyles} />
    </InputContainerStyled>
  );
};

export default Input;
