/** @type {import("stylelint").Config} */
export default {
  extends: ['stylelint-config-standard'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'source',
          'theme',
          'utility',
          'variant',
          'custom-variant',
          'plugin',
          'layer',
          'apply',
        ],
      },
    ],
    'selector-class-pattern': [
      '^[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z0-9]+(-[a-z0-9]+)*)?(--[a-z0-9]+(-[a-z0-9]+)*)?$',
      { message: 'Expected class selector to follow BEM convention (block__element--modifier)' },
    ],
    'no-descending-specificity': null,
  },
};
