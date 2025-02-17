import { wrapCliTask } from 'obsidian-dev-utils/ScriptUtils/CliUtils';
import { process } from 'obsidian-dev-utils/ScriptUtils/NodeModules';
import { publish } from 'obsidian-dev-utils/ScriptUtils/NpmPublish';
import { updateVersion } from 'obsidian-dev-utils/ScriptUtils/version';

await wrapCliTask(async () => {
  const VERSION_UPDATE_TYPE_ARG_INDEX = 2;
  const versionUpdateTypeStr = process.argv[VERSION_UPDATE_TYPE_ARG_INDEX];
  await updateVersion(versionUpdateTypeStr);
  const isBeta = versionUpdateTypeStr === 'beta';
  await publish(isBeta);
});
