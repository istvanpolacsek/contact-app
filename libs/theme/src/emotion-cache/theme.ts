import { Lexend_Deca } from 'next/font/google';

const lexendDeca = Lexend_Deca({
  subsets: ['latin'],
  weight: ['400'],
});

export type Breakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type FROM = number;
type TO = number;

export type BreakpointDictionary = Record<Breakpoints, [FROM, TO]>;

export const BREAKPOINT_DICTIONARY: BreakpointDictionary = {
  xs: [0, 359],
  sm: [360, 479],
  md: [480, 767],
  lg: [768, 1023],
  xl: [1024, Infinity],
} as const;

export const theme = {
  palette: {
    colors: {
      white: '#ffffff',
      grey: {
        10: '#414141',
        20: '#3C3C3C',
        30: '#373737',
        40: '#323232',
        50: '#2D2D2D',
        60: '#282828',
        70: '#232323',
        80: '#1E1E1E',
        90: '#191919',
        100: '#141414',
      },
    },
  },
  typography: {
    fontFamilies: {
      lexendDeca: lexendDeca.style.fontFamily,
    },
  },
} as const;

export type Theme = typeof theme;
