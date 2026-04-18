import { createContext, type FC, type ProviderProps } from 'react';

export type Translations = Record<string, string>;

export const TranslationsContext = createContext<Translations>({});

const { Provider } = TranslationsContext;

const TranslationsProvider: FC<ProviderProps<Translations>> = ({ children, value }) => (
  <Provider value={value}>{children}</Provider>
);

export default TranslationsProvider;
