"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _cache = /*#__PURE__*/ _interop_require_default._(require("@emotion/cache"));
const _navigation = require("next/navigation");
const _react = require("@emotion/react");
const _theme = require("./theme");
const _cssreset = require("./css-reset");
const cache = (0, _cache.default)({
    key: 'app',
    prepend: true
});
cache.compat = true;
const EmotionRegistry = ({ children })=>{
    const inserted = [];
    const originalInsert = cache.insert;
    cache.insert = (...args)=>{
        const serialized = args[1];
        if (cache.inserted[serialized.name] === undefined) {
            inserted.push(serialized.name);
        }
        return originalInsert(...args);
    };
    (0, _navigation.useServerInsertedHTML)(()=>{
        let styles = '';
        inserted.forEach((name)=>{
            styles += cache.inserted[name];
        });
        return /*#__PURE__*/ React.createElement("style", {
            "data-emotion": `${cache.key} ${inserted.join(' ')}`,
            dangerouslySetInnerHTML: {
                __html: styles
            }
        });
    });
    return /*#__PURE__*/ React.createElement(_react.CacheProvider, {
        value: cache
    }, /*#__PURE__*/ React.createElement(_react.ThemeProvider, {
        theme: _theme.theme
    }, /*#__PURE__*/ React.createElement(_cssreset.CssReset, {
        theme: _theme.theme
    }), children));
};
const _default = EmotionRegistry;

//# sourceMappingURL=EmotionCache.js.map