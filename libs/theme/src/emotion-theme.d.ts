import type { Theme as CustomTheme } from './emotion-cache/theme';

declare module '@emotion/react' {
  export interface Theme extends CustomTheme {}
}
