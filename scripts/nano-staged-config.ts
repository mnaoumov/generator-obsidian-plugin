const SPELLCHECK_COMMAND = 'npm run spellcheck --';

/*
 * Spellcheck is PARTITIONED across the keys rather than given a catch-all `'*'` key. nano-staged builds one
 * task group per pattern and runs the groups with `Promise.all` (see the vendored-rules key below), so a `'*'`
 * key read a staged file while `lint:fix`, `format` or `lint:md:fix` rewrote it in place. So each writer key
 * runs spellcheck as its LAST command, after its files are rewritten, and the first key spellchecks exactly
 * the files no writer key claims.
 *
 * That key is written in nano-staged's own glob dialect, which compiles `!(...)` to a lookahead NOT anchored
 * at the end of the path: `!(*.md)*` would exclude `notes.md.bak` too. A nested `!(?)` compiles to `(?!.)`,
 * which is an end anchor, hence the suffix on each alternative. It has to list every writer pattern below, so
 * a new writer key is added to it too. This is the shape `obsidian-dev-utils`' `getNanoStagedConfig()`
 * builds; this repo does not depend on that package, so it is copied by hand.
 */
export const config: Record<string, string[]> = {
  '!(*.{ts,tsx,mts}!(?)|*.md!(?))*': [
    SPELLCHECK_COMMAND
  ],
  '*.{ts,tsx,mts}': [
    'npm run lint:fix --',
    'npm run format --',
    SPELLCHECK_COMMAND
  ],
  '*.md': [
    'npm run lint:md:fix --',
    SPELLCHECK_COMMAND
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
