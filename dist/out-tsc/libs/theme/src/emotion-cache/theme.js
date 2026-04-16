import { Lexend_Deca } from 'next/font/google';
import localFont from 'next/font/local';
const lexendDeca = Lexend_Deca({
    subsets: ['latin'],
    weight: ['400'],
});
const glysa = localFont({
    src: './Glysa.otf',
});
export const BREAKPOINT_DICTIONARY = {
    xs: [0, 359],
    sm: [360, 479],
    md: [480, 767],
    lg: [768, 1023],
    xl: [1024, Infinity],
};
export const theme = {
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
                100: '#141414',
            },
        },
    },
    typography: {
        fontFamilies: {
            lexendDeca: lexendDeca.style.fontFamily,
            glysa: glysa.style.fontFamily,
        },
    },
};
//# sourceMappingURL=theme.js.map