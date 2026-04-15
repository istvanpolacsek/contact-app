import type { Theme as CustomTheme } from '@contact-app/theme';

declare module '@emotion/react' {
  export type Theme = CustomTheme;
}
