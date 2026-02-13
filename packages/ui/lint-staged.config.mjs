import config from '../../lint-staged.config.mjs';

export default {
  ...config,
  '*.{ts,tsx}': ['eslint --fix --cache'],
};
