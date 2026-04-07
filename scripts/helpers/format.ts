import { join } from 'node:path/posix';

import {
  execFromRoot,
  getRootFolder
} from './root.ts';
import { assertNonNullable } from './type-guards.ts';

interface FormatParams {
  paths?: string[] | undefined;
  rewrite?: boolean | undefined;
}

export async function format(params?: FormatParams): Promise<void> {
  const { paths, rewrite = true } = params ?? {};
  const rootFolder = getRootFolder();
  assertNonNullable(rootFolder, 'Root folder not found');

  const command = rewrite ? 'fmt' : 'check';
  const targets = paths?.length ? paths : ['**/*'];
  await execFromRoot(['npx', 'dprint', command, '--config', join(rootFolder, 'dprint.json'), { batchedArgs: targets }]);
}
