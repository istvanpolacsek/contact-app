import { type PropsWithChildren } from 'react';
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
};

export const metadata = {
  title: translations.appTitle,
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <EmotionCache>
      <TranslationsProvider value={translations}>
        <html lang="en">
          <body>{children}</body>
        </html>
      </TranslationsProvider>
    </EmotionCache>
  );
}
