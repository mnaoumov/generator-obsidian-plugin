import { PluginSettingsBase } from "obsidian-dev-utils/obsidian/Plugin/PluginSettingsBase";

export default class <%= pluginShortName %>PluginSettings extends PluginSettingsBase {
  public testSetting: string = "defaultValue";
}
