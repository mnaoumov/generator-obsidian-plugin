import process from 'node:process';

import { format } from './helpers/format.ts';

const [, , ...paths] = process.argv;

await format({ paths, rewrite: false });
