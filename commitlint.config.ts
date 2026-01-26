const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 200], // Enforces a max of 200 characters in the header
    'body-max-line-length': [2, 'always', 500], // Enforces a max of 500 characters per line
    'subject-case': [1, 'always', ['sentence-case', 'lower-case']], // Enforces sentence case for the subject
  },
};

export default config;
