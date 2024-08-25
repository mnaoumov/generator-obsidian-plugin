import type <%= pluginShortName %>Plugin from "./<%= pluginShortName %>Plugin.ts";
import { PluginSettingsTabBase } from "obsidian-dev-utils/obsidian/Plugin/PluginSettingsTabBase";
import type <%= pluginShortName %>PluginSettings from "./<%= pluginShortName %>PluginSettings.ts";
import { Setting } from "obsidian";
import { bindUiComponent } from "obsidian-dev-utils/obsidian/Plugin/UIComponent";

export default class <%= pluginShortName %>PluginSettingsTab extends PluginSettingsTabBase<<%= pluginShortName %>Plugin> {
  public override display(): void {
    this.containerEl.empty();

    new Setting(this.containerEl)
      .setName("Test Setting")
      .setDesc("This is a test setting.")
      .addText((text) => bindUiComponent(this.plugin, text, "testSetting")
        .setPlaceholder("Enter a value")
      );
  }
}
