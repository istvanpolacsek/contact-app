import { type Preview } from '@storybook/react';
import { ThemeDecorator } from './decorators';
import { theme } from '@contact-app/theme';

export default {
  parameters: {
    backgrounds: {
      options: {
        dark: { name: 'dark', value: theme.palette.colors.grey[100] },
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: 'dark' },
  },
  decorators: [ThemeDecorator],
} satisfies Preview;
