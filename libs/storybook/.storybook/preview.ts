import { type Preview } from '@storybook/nextjs';
import { ThemeDecorator, TranslationsDecorator } from './decorators';
import { theme, BREAKPOINT_DICTIONARY, type Breakpoints } from '@contact-app/theme';
import { reduce, toUpper } from 'lodash';

interface Viewport {
  name: string;
  styles: { height: string; width: string };
  type: 'desktop' | 'mobile' | 'tablet' | 'other';
}

function getViewportOption(width: number, breakpoint: Breakpoints, displayName: string): Viewport {
  switch (breakpoint) {
    case 'xs':
    case 'sm':
      return {
        name: displayName,
        styles: { width: `${width}px`, height: `${Math.ceil((width * 16) / 9)}px` },
        type: 'mobile',
      };
    case 'md':
      return {
        name: displayName,
        styles: { width: `${width}px`, height: `${Math.ceil((width * 4) / 3)}px` },
        type: 'tablet',
      };
    default:
      return {
        name: displayName,
        styles: { width: `${width}px`, height: `${Math.ceil((width * 9) / 16)}px` },
        type: 'desktop',
      };
  }
}

const viewportOptions = reduce(
  BREAKPOINT_DICTIONARY,
  (acc, [from, to], name) => {
    const displayName =
      to === Infinity ? `${toUpper(name)} (${from}px+)` : `${toUpper(name)} (${from}px - ${to}px)`;
    const width = from === 0 ? to : from;

    return {
      ...acc,
      [name]: getViewportOption(width, name as Breakpoints, displayName),
    };
  },
  {},
);

export default {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/',
        query: {},
      },
    },
    backgrounds: {
      options: {
        dark: { name: 'dark', value: theme.palette.colors.grey[100] },
      },
    },
    viewport: {
      options: {
        ...viewportOptions,
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: 'dark' },
  },
  decorators: [ThemeDecorator, TranslationsDecorator],
} satisfies Preview;
