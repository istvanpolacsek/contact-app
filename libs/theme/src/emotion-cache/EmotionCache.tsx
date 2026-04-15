import { type FC, type PropsWithChildren } from 'react';
import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider, ThemeProvider } from '@emotion/react';
import { theme } from './theme';
import { CssReset } from './css-reset';

const cache = createCache({ key: 'app', prepend: true });
cache.compat = true;

const EmotionRegistry: FC<PropsWithChildren> = ({ children }) => {
  const inserted: string[] = [];

  const originalInsert = cache.insert;
  cache.insert = (...args) => {
    const serialized = args[1];
    if (cache.inserted[serialized.name] === undefined) {
      inserted.push(serialized.name);
    }
    return originalInsert(...args);
  };

  useServerInsertedHTML(() => {
    let styles = '';

    inserted.forEach((name) => {
      styles += cache.inserted[name];
    });

    return (
      <style
        data-emotion={`${cache.key} ${inserted.join(' ')}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssReset theme={theme} />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
};

export default EmotionRegistry;
