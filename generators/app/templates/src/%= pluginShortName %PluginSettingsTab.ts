import { PluginSettingTab } from "obsidian";
import type <%= pluginShortName %>Plugin from "./<%= pluginShortName %>Plugin.ts";

export default class <%= pluginShortName %>PluginSettingsTab extends PluginSettingTab {
  public override plugin: <%= pluginShortName %>Plugin;

  public constructor(plugin: <%= pluginShortName %>Plugin) {
    super(plugin.app, plugin);
    this.plugin = plugin;
  }

  public override display(): void {
    this.containerEl.empty();
    this.containerEl.createEl("h2", { text: "<%= pluginName %>" });

    const settings = this.plugin.settings;
  }
}
