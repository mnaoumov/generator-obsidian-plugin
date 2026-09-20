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
   * the same bytes. `lint:fix` and `format` above rewrite a staged copy in place, which is one of the ways
   * these files drift, so this check has to read what is about to be committed - and where its key sits
   * cannot buy that. **nano-staged builds one task group per pattern and runs the groups with
   * `Promise.all`** (measured against nano-staged 1.0.2, 2026-09-19), so this group RACES `lint:fix` rather
   * than following it; sequencing exists within a single key's command list and nowhere else. Key order
   * here says nothing about when anything runs.
   *
   * So the ordering is not enforced, it is made IRRELEVANT: this gate reads its subject out of the git index
   * rather than off disk (`scripts/helpers/git-content.ts`), which is the same bytes whether `lint:fix` has
   * run or not. Moving this key, or letting a future nano-staged order the groups differently, changes
   * nothing.
   *
   * It takes no filenames: the glob is only what decides whether it runs at all, so an ordinary commit
   * touching no vendored file fetches nothing.
   */
  '**/eslint-rules/*.ts': [
    'npm run check:vendored-eslint-rules'
  ]
};
