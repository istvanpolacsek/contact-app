import { ICONS } from './constants';
import { type FC } from 'react';

export interface IconProps {
  icon: keyof typeof ICONS;
  width?: number;
  height?: number;
}

const Icon: FC<IconProps> = ({ icon, ...rest }) => {
  const IconComponent = ICONS[icon];

  return <IconComponent {...rest} />;
};

export default Icon;
