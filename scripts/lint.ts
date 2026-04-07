import process from 'node:process';

import { lint } from './helpers/eslint.ts';

const [, , ...paths] = process.argv;

await lint({ paths, shouldFix: false });
