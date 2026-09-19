export const config: Record<string, string[]> = {
  '*': [
    'npm run spellcheck --'
  ],
  '*.{ts,tsx,mts}': [
    'npm run lint:fix --',
    'npm run format --'
  ],
  '*.md': [
    'npm run lint:md:fix --'
  ],
  /*
   * The vendored ESLint rule sources, which are hand-copies of `obsidian-dev-utils`' and are supposed to be
   * the same bytes. Running last is what makes this useful rather than merely present: `lint:fix` and
   * `format` above rewrite a staged copy in place, which is one of the ways these files drift, so the check
   * has to read what is about to be committed rather than what was staged.
   *
   * It takes no filenames: the glob is only what decides whether it runs at all, so an ordinary commit
   * touching no vendored file fetches nothing.
   */
  '**/eslint-rules/*.ts': [
    'npm run check:vendored-eslint-rules'
  ]
};
