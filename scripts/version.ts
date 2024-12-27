
import { wrapCliTask } from 'obsidian-dev-utils/scripts/CliUtils';
import { updateVersion } from 'obsidian-dev-utils/scripts/version';
import { publish } from 'obsidian-dev-utils/scripts/NpmPublish';
import { process } from 'obsidian-dev-utils/scripts/NodeModules';

await wrapCliTask(async () => {
  const versionUpdateTypeStr = process.argv[2];
  await updateVersion(versionUpdateTypeStr);
  const isBeta = versionUpdateTypeStr === 'beta';
  await publish(isBeta);
});
