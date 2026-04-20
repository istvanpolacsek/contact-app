import { type Preview } from '@storybook/nextjs';
import { ThemeDecorator, TranslationsDecorator } from './decorators';
import { theme } from '@contact-app/theme';

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
  },
  initialGlobals: {
    backgrounds: { value: 'dark' },
  },
  decorators: [ThemeDecorator, TranslationsDecorator],
} satisfies Preview;
