import { type Preview } from '@storybook/react';
import { ThemeDecorator } from './decorators';

export default {
  parameters: {},
  decorators: [ThemeDecorator],
} satisfies Preview;
