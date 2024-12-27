import { wrapCliTask } from 'obsidian-dev-utils/scripts/CliUtils';
import { process } from 'obsidian-dev-utils/scripts/NodeModules';
import { publish } from 'obsidian-dev-utils/scripts/NpmPublish';
import { updateVersion } from 'obsidian-dev-utils/scripts/version';

await wrapCliTask(async () => {
  const versionUpdateTypeStr = process.argv[2];
  await updateVersion(versionUpdateTypeStr);
  const isBeta = versionUpdateTypeStr === 'beta';
  await publish(isBeta);
});
