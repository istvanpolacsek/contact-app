import { type FC, type ReactNode } from 'react';
import { type ButtonVariants } from './constants';
import { type IconVariants, Icon } from '..';
import { ButtonStyled } from './Button.styles';
import { type HTMLMotionProps } from 'motion/react';
import { useMotion } from './hooks';

export interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: ButtonVariants;
  icon?: IconVariants;
}

const Button: FC<ButtonProps> = ({
  icon,
  variant = 'primary',
  children,
  ...rest
}) => {
  const motionProps = useMotion(variant);

  return (
    <ButtonStyled $variant={variant} {...rest} {...motionProps}>
      {icon ? <Icon icon={icon} /> : null}
      {children as ReactNode}
    </ButtonStyled>
  );
};

export default Button;
