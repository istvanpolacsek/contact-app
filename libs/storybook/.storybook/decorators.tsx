import { type Decorator } from '@storybook/react';
import { EmotionCache } from '@contact-app/theme';
import { TranslationsProvider } from '@contact-app/ui';

const translations = {
  appTitle: 'Contact App',
  addNewTitle: 'Add contact',
  goBack: 'Back',
  lightMode: 'Light Mode',
  settings: 'Settings',
  contact: 'Contact',
  defaultContact: 'Default Contact',
  add: 'Add',
  edit: 'Edit',
  addPicture: 'Add Picture',
  editPicture: 'Change Picture',
  deletePicture: 'Delete Picture',
  profilePicture: 'Profile Picture',
  processing: 'Processing...',
  done: 'Done',
  cancel: 'Cancel',
  name: 'Name',
  phoneNumber: 'Phone Number',
  email: 'Email',
  mute: 'Mute',
  call: 'Call',
  moreActions: 'More Actions',
};

export const ThemeDecorator: Decorator = (Story) => <EmotionCache>{Story()}</EmotionCache>;

export const TranslationsDecorator: Decorator = (Story) => (
  <TranslationsProvider value={translations}>{Story()}</TranslationsProvider>
);
