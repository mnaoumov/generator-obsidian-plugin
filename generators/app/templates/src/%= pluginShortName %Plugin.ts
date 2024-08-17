import { PluginSettingTab } from "obsidian";
import <%= pluginShortName %>PluginSettings from "./<%= pluginShortName %>PluginSettings.ts";
import { PluginBase } from "obsidian-dev-utils/obsidian/Plugin/PluginBase";
import type { Constructor } from "obsidian-dev-utils/Type";
import <%= pluginShortName %>PluginSettingsTab from "./<%= pluginShortName %>PluginSettingsTab.ts";

export default class <%= pluginShortName %>Plugin extends PluginBase<<%= pluginShortName %>PluginSettings> {
  protected override get PluginSettingsConstructor(): Constructor<<%= pluginShortName %>PluginSettings> {
    return <%= pluginShortName %>PluginSettings;
  }

  protected override createPluginSettingsTab(): PluginSettingTab | null {
    return new <%= pluginShortName %>PluginSettingsTab(this);
  }

  protected override async onloadComplete(): Promise<void> {
  }
}
