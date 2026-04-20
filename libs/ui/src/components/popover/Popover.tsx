import { type FC, useRef, useState, useEffect, useCallback } from 'react';
import { type IconVariants, type ButtonProps } from '..';
import {
  PopoverTriggerWrapper,
  PopoverMenuStyled,
  PopoverMenuItemStyled,
  PopoverMenuItemButtonStyled,
  PopoverMenuItemTitleStyled,
} from './Popover.styles';
import { type PopoverPlacement, type ActionItem } from './constants';
import Icon from '../icon/Icon';
import Button from '../button/Button';
import { useTheme } from '@contact-app/theme';

export interface PopoverProps {
  actions: ActionItem[];
  placement?: PopoverPlacement;
  triggerIcon?: IconVariants;
  triggerVariant?: ButtonProps['variant'];
  title?: string;
}

const Popover: FC<PopoverProps> = ({
  actions,
  placement = 'bottom-right',
  triggerIcon = 'more',
  triggerVariant = 'secondary',
  title,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const menuRef = useRef<HTMLUListElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuItemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const theme = useTheme();

  const handleTriggerClick = useCallback(() => {
    setIsOpen((prev) => !prev);
    setFocusedIndex(-1);
  }, []);

  // Focus first item when menu opens
  useEffect(() => {
    if (isOpen && menuItemRefs.current[0]) {
      setFocusedIndex(0);
      menuItemRefs.current[0].focus();
    }
  }, [isOpen]);

  // Focus item based on focusedIndex
  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && menuItemRefs.current[focusedIndex]) {
      menuItemRefs.current[focusedIndex].focus();
    }
  }, [focusedIndex, isOpen]);

  // Keyboard navigation: Arrow Up/Down, Enter, Esc
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setFocusedIndex((prev) => (prev + 1) % actions.length);
          break;
        case 'ArrowUp':
          event.preventDefault();
          setFocusedIndex((prev) => (prev === 0 ? actions.length - 1 : prev - 1));
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          if (focusedIndex >= 0) {
            actions[focusedIndex].onClick();
            setIsOpen(false);
          }
          break;
        case 'Escape':
          event.preventDefault();
          setIsOpen(false);
          triggerRef.current?.focus();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, focusedIndex, actions]);

  // Click outside to close
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleActionClick = (onClick: ActionItem['onClick']) => () => {
    onClick();
    setIsOpen(false);
  };

  return (
    <PopoverTriggerWrapper>
      <Button
        ref={triggerRef}
        variant={triggerVariant}
        icon={triggerIcon}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls="popover-menu"
        onClick={handleTriggerClick}
        title={title}
      />
      {isOpen && (
        <PopoverMenuStyled
          id="popover-menu"
          ref={menuRef}
          role="menu"
          $placement={placement}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          {actions.map(({ name, icon, onClick }, i) => (
            <PopoverMenuItemStyled key={`${name}-${i}`} aria-selected={focusedIndex === i}>
              <PopoverMenuItemButtonStyled
                ref={(el) => {
                  menuItemRefs.current[i] = el;
                }}
                role="menuitem"
                onClick={handleActionClick(onClick)}
                whileHover={{ backgroundColor: theme.palette.colors.grey[70] }}
                whileTap={{ backgroundColor: theme.palette.colors.grey[60] }}
              >
                {icon && <Icon icon={icon} width={20} height={20} />}
                <PopoverMenuItemTitleStyled>{name}</PopoverMenuItemTitleStyled>
              </PopoverMenuItemButtonStyled>
            </PopoverMenuItemStyled>
          ))}
        </PopoverMenuStyled>
      )}
    </PopoverTriggerWrapper>
  );
};

export default Popover;
