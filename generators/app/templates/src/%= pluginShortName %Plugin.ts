import { Plugin } from "obsidian";
import <%= pluginShortName %>PluginSettings from "./<%= pluginShortName %>PluginSettings.ts";
import <%= pluginShortName %>PluginSettingsTab from "./<%= pluginShortName %>PluginSettingsTab.ts";

export default class <%= pluginShortName %>Plugin extends Plugin {
  private _settings!: <%= pluginShortName %>PluginSettings;

  public get settings(): <%= pluginShortName %>PluginSettings {
    return <%= pluginShortName %>PluginSettings.clone(this._settings);
  }

  public override async onload(): Promise<void> {
    await this.loadSettings();
    this.addSettingTab(new <%= pluginShortName %>PluginSettingsTab(this));
    this.app.workspace.onLayoutReady(this.onLayoutReady.bind(this));
  }

  public async saveSettings(newSettings: <%= pluginShortName %>PluginSettings): Promise<void> {
    this._settings = <%= pluginShortName %>PluginSettings.clone(newSettings);
    await this.saveData(this._settings);
  }

  private async onLayoutReady(): Promise<void> {
  }

  private async loadSettings(): Promise<void> {
    this._settings = <%= pluginShortName %>PluginSettings.load(await this.loadData());
  }
}
