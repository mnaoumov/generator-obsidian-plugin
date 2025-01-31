import { wrapCliTask } from 'obsidian-dev-utils/scripts/CliUtils';
import { process } from 'obsidian-dev-utils/scripts/NodeModules';
import { publish } from 'obsidian-dev-utils/scripts/NpmPublish';
import { updateVersion } from 'obsidian-dev-utils/scripts/version';

await wrapCliTask(async () => {
  const VERSION_UPDATE_TYPE_ARG_INDEX = 2;
  const versionUpdateTypeStr = process.argv[VERSION_UPDATE_TYPE_ARG_INDEX];
  await updateVersion(versionUpdateTypeStr);
  const isBeta = versionUpdateTypeStr === 'beta';
  await publish(isBeta);
});
