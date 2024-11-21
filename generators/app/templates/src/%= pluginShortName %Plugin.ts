import { PluginSettingTab } from 'obsidian';
import { PluginBase } from 'obsidian-dev-utils/obsidian/Plugin/PluginBase';

import { <%= pluginShortName %>PluginSettings } from './<%= pluginShortName %>PluginSettings.ts';
import { <%= pluginShortName %>PluginSettingsTab } from './<%= pluginShortName %>PluginSettingsTab.ts';

export class <%= pluginShortName %>Plugin extends PluginBase<<%= pluginShortName %>PluginSettings> {
  protected override createDefaultPluginSettings(): <%= pluginShortName %>PluginSettings {
    return new <%= pluginShortName %>PluginSettings();
  }

  protected override createPluginSettingsTab(): null | PluginSettingTab {
    return new <%= pluginShortName %>PluginSettingsTab(this);
  }

  protected override async onloadComplete(): Promise<void> {
    // TODO: Implement onloadComplete
  }
}
