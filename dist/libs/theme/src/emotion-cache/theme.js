"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get BREAKPOINT_DICTIONARY () {
        return BREAKPOINT_DICTIONARY;
    },
    get theme () {
        return theme;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _google = require("next/font/google");
const _local = /*#__PURE__*/ _interop_require_default._(require("next/font/local"));
const lexendDeca = (0, _google.Lexend_Deca)({
    subsets: [
        'latin'
    ],
    weight: [
        '400'
    ]
});
const glysa = (0, _local.default)({
    src: './Glysa.otf'
});
const BREAKPOINT_DICTIONARY = {
    xs: [
        0,
        359
    ],
    sm: [
        360,
        479
    ],
    md: [
        480,
        767
    ],
    lg: [
        768,
        1023
    ],
    xl: [
        1024,
        Infinity
    ]
};
const theme = {
    palette: {
        colors: {
            white: '#ffffff',
            grey: {
                10: '#414141',
                20: '#3C3C3C',
                30: '#373737',
                40: '#323232',
                50: '#2D2D2D',
                60: '#282828',
                70: '#232323',
                80: '#1E1E1E',
                90: '#191919',
                100: '#141414'
            }
        }
    },
    typography: {
        fontFamilies: {
            lexendDeca: lexendDeca.style.fontFamily,
            glysa: glysa.style.fontFamily
        }
    }
};

//# sourceMappingURL=theme.js.map