/** @type {import("prettier").Config} */
export default {
  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
  singleQuote: true,
  experimentalTernaries: true,
  jsxSingleQuote: true,
  importOrder: [
    '^@core/(.*)$',
    '',
    '^@server/(.*)$',
    '',
    '^@ui/(.*)$',
    '',
    '^[./]',
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderTypeScriptVersion: '5.0.0',
};
