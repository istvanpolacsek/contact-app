import { type ButtonHTMLAttributes, type FC } from 'react';
import { type ButtonVariants } from './constants';
import { type IconVariants, Icon } from '..';
import { ButtonStyled } from './Button.styles';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
  icon?: IconVariants;
}

const Button: FC<ButtonProps> = ({
  icon,
  variant = 'primary',
  children,
  ...rest
}) => (
  <ButtonStyled $variant={variant} {...rest}>
    {icon ? <Icon icon={icon} /> : null}
    {children}
  </ButtonStyled>
);

export default Button;
