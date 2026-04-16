import { useTheme as useEmotionTheme } from '@emotion/react';
import type { Theme } from '../emotion-cache/theme';

export function useTheme(): Theme {
  return useEmotionTheme() as Theme;
}
