import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider, ThemeProvider } from '@emotion/react';
import { theme } from './theme';
import { CssReset } from './css-reset';
const cache = createCache({ key: 'app', prepend: true });
cache.compat = true;
const EmotionRegistry = ({ children }) => {
    const inserted = [];
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
        return (_jsx("style", { "data-emotion": `${cache.key} ${inserted.join(' ')}`, dangerouslySetInnerHTML: { __html: styles } }));
    });
    return (_jsx(CacheProvider, { value: cache, children: _jsxs(ThemeProvider, { theme: theme, children: [_jsx(CssReset, { theme: theme }), children] }) }));
};
export default EmotionRegistry;
//# sourceMappingURL=EmotionCache.js.map