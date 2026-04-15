import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

import type { StorybookConfig } from '@storybook/nextjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const glysaFontDir = resolve(__dirname, '../../theme/src/emotion-cache');

const config: StorybookConfig = {
  // Collect stories from every library under libs/ (single-instance pattern)
  stories: ['../../**/*.stories.@(js|jsx|ts|tsx)', '../../**/*.mdx'],
  addons: [],
  framework: {
    name: getAbsolutePath('@storybook/nextjs'),
    options: {
      // Reuse the app's Next.js config so compiler.emotion = true (SWC Emotion transform)
      // and any other Next.js-level configuration is applied consistently.
      nextConfigPath: resolve(__dirname, '../../../apps/app/next.config.js'),
    },
  },
  staticDirs: [
    {
      from: glysaFontDir,
      to: glysaFontDir.replaceAll('\\', '/'),
    },
  ],
  features: {
    sidebarOnboardingChecklist: false,
  },
};

function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}

export default config;
