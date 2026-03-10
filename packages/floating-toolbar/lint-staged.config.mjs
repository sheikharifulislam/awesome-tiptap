import config from '../../lint-staged.config.mjs';

export default {
  ...config,
  '*.css': ['stylelint --fix', 'prettier --write --cache'],
  '*.{ts,tsx}': ['eslint --fix --cache'],
};
