import { publish } from 'obsidian-dev-utils/ScriptUtils/NpmPublish';
import { updateVersion } from 'obsidian-dev-utils/ScriptUtils/version';

export async function invoke(versionUpdateType: string): Promise<void> {
  await updateVersion(versionUpdateType);
  const isBeta = versionUpdateType === 'beta';
  await publish(isBeta);
}
