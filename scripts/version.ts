import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import process from 'node:process';

const VERSION_ARG_INDEX = 2;

function main(): void {
  const versionUpdateType = process.argv[VERSION_ARG_INDEX];

  if (!versionUpdateType) {
    console.error('Usage: jiti scripts/version.ts <major|minor|patch|premajor|preminor|prepatch|prerelease|x.y.z>');
    process.exit(1);
  }

  const isBeta = versionUpdateType === 'beta' || versionUpdateType === 'prerelease';
  const tag = isBeta ? 'beta' : 'latest';

  execSync(`npm version ${versionUpdateType} --no-git-tag-version`, { stdio: 'inherit' });
  execSync('git add package.json npm-shrinkwrap.json', { stdio: 'inherit' });

  const packageJson = JSON.parse(readFileSync('package.json', 'utf-8')) as { version: string };
  const newVersion = packageJson.version;

  execSync(`git commit -m "chore: release v${newVersion}"`, { stdio: 'inherit' });
  execSync(`git tag v${newVersion}`, { stdio: 'inherit' });
  execSync('git push --follow-tags', { stdio: 'inherit' });
  execSync(`npm publish --tag ${tag}`, { stdio: 'inherit' });

  console.log(`Published v${newVersion} with tag "${tag}"`);
}

main();
