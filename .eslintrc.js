module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  globals: {
    localStorage: 'off',
    sessionStorage: 'off',
    uni: 'readonly',
    wx: 'readonly'
  },
  extends: [
    // https://eslint.bootcss.com/docs/rules/ 推荐配置
    'eslint:recommended',
    // https://github.com/prettier/eslint-plugin-prettier
    'plugin:prettier/recommended',
    'plugin:vue/essential',
    'plugin:vue/strongly-recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['vue', 'prettier'],
  rules: {
    'prettier/prettier': 'warn',
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    eqeqeq: ['error', 'always'],
    'no-debugger': 'off',
    'no-empty': 'off',
    'no-unused-vars': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-v-model-argument': 'off',
    'vue/no-unused-components': 'off',
    'vue/no-unused-vars': 'off',
    'vue/require-v-for-key': 'off'
  }
}