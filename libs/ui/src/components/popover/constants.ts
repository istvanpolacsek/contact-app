import { type IconVariants } from '..';

export type PopoverPlacement =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export interface ActionItem {
  name: string;
  icon?: IconVariants;
  onClick: () => void;
}
