import { Setting } from 'obsidian';
import { PluginSettingsTabBase } from 'obsidian-dev-utils/obsidian/Plugin/PluginSettingsTabBase';
import { bindValueComponent } from 'obsidian-dev-utils/obsidian/Plugin/ValueComponent';

import type <%= pluginShortName %>Plugin from './<%= pluginShortName %>Plugin.ts';

export default class <%= pluginShortName %>PluginSettingsTab extends PluginSettingsTabBase<<%= pluginShortName %>Plugin> {
  public override display(): void {
    this.containerEl.empty();

    new Setting(this.containerEl)
      .setName('Test Setting')
      .setDesc('This is a test setting.')
      .addText((text) => bindValueComponent(this.plugin, text, 'testSetting')
        .setPlaceholder('Enter a value')
      );
  }
}
