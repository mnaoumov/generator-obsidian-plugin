import { execFromRoot } from './root.ts';

interface LintParams {
  paths?: string[] | undefined;
  shouldFix?: boolean | undefined;
}

export async function lint(params: LintParams = {}): Promise<void> {
  const targets = params.paths?.length ? params.paths : ['.'];
  await execFromRoot(['npx', 'eslint', ...(params.shouldFix ? ['--fix'] : []), { batchedArgs: targets }]);
}
