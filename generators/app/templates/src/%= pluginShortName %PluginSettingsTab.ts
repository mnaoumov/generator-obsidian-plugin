import type <%= pluginShortName %>Plugin from "./<%= pluginShortName %>Plugin.ts";
import { PluginSettingsTabBase } from "obsidian-dev-utils/obsidian/Plugin/PluginSettingsTabBase";
import type <%= pluginShortName %>PluginSettings from "./<%= pluginShortName %>PluginSettings.ts";
import { Setting } from "obsidian";

export default class <%= pluginShortName %>PluginSettingsTab extends PluginSettingsTabBase<<%= pluginShortName %>Plugin, <%= pluginShortName %>PluginSettings> {
  public override display(): void {
    this.containerEl.empty();

    const pluginSettings = this.plugin.settings;

    new Setting(this.containerEl)
      .setName("Test Setting")
      .setDesc("This is a test setting.")
      .addText((text) => {
        text.setPlaceholder("Enter a value");
        this.bindValueComponent(text, pluginSettings, "testSetting");
      });
  }
}
