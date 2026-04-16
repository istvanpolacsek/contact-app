import { type ButtonVariants } from './constants';
import { useMemo } from 'react';
import { type HTMLMotionProps } from 'motion/react';
import { addTransparency, useTheme } from '@contact-app/theme';

export function useMotion(variant: ButtonVariants): HTMLMotionProps<'button'> {
  const useMotionHook = useMemo(() => {
    switch (variant) {
      case 'special':
        return useGradientMotion;
      default:
        return useSimpleMotion;
    }
  }, [variant]);

  return useMotionHook(variant);
}

function useSimpleMotion(variant: ButtonVariants): HTMLMotionProps<'button'> {
  const theme = useTheme();

  switch (variant) {
    case 'primary':
      return {
        style: { background: theme.palette.colors.grey[60] },
        whileHover: { background: theme.palette.colors.grey[50] },
        whileTap: { background: theme.palette.colors.grey[40] },
      };
    case 'secondary':
      return {
        style: {
          background: addTransparency(theme.palette.colors.grey[90], 0),
        },
        whileHover: {
          background: addTransparency(theme.palette.colors.grey[90], 100),
        },
        whileTap: { background: theme.palette.colors.grey[80] },
      };
    default:
      return {};
  }
}

function useGradientMotion(): HTMLMotionProps<'button'> {
  const theme = useTheme();

  return {
    style: { background: addTransparency(theme.palette.colors.white, 0) },
    whileHover: { background: addTransparency(theme.palette.colors.white, 4) },
    whileTap: { background: addTransparency(theme.palette.colors.white, 10) },
  };
}
