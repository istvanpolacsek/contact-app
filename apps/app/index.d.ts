import type { Theme as CustomTheme } from '@contact-app/theme';

/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.svg' {
  const content: any;
  export const ReactComponent: any;
  export default content;
}

declare module '@emotion/react' {
  export type Theme = CustomTheme;
}
