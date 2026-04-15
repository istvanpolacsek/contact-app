import { ICONS, type IconVariants } from './constants';
import { type FC } from 'react';

export interface IconProps {
  icon: IconVariants;
  width?: number;
  height?: number;
}

const Icon: FC<IconProps> = ({ icon, ...rest }) => {
  const IconComponent = ICONS[icon];

  return <IconComponent {...rest} />;
};

export default Icon;
