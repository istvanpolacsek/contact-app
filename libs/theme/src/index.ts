'use client';

/// <reference path="./emotion-theme.d.ts" />

// Theme object and types
export { theme, type Theme } from './emotion-cache/theme';
export type { Breakpoints, BreakpointDictionary } from './emotion-cache/theme';
export { BREAKPOINT_DICTIONARY } from './emotion-cache/theme';

// Emotion cache utilities
export { default as EmotionCache } from './emotion-cache/EmotionCache';

// Helper utilities
export { default as addHoverEffect } from './add-hover-effect';
export { default as addStylesForBreakpoints } from './add-styles-for-breakpoints';
export { default as addTransparency } from './add-transparency';
