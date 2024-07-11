import {
  PluginSettingTab,
  Setting
} from "obsidian";
import type <%= pluginShortName %>Plugin from "./<%= pluginShortName %>Plugin.ts";

export default class <%= pluginShortName %>PluginSettingsTab extends PluginSettingTab {
  public override plugin: <%= pluginShortName %>Plugin;

  public constructor(plugin: <%= pluginShortName %>Plugin) {
    super(plugin.app, plugin);
    this.plugin = plugin;
  }

  public override display(): void {
    this.containerEl.empty();

    const settings = this.plugin.settings;

    new Setting(this.containerEl)
      .setName("Test setting name")
      .setDesc("Test setting description")
      .addText((text) =>
        text
          .setValue(settings.testSetting)
          .onChange(async (value) => {
            settings.testSetting = value;
            await this.plugin.saveSettings(settings);
          })
      );
  }
}
