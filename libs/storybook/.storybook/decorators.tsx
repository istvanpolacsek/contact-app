import { type Decorator } from '@storybook/react';
import { EmotionCache } from '@contact-app/theme';

export const ThemeDecorator: Decorator = (Story) => (
  <EmotionCache>{Story()}</EmotionCache>
);
