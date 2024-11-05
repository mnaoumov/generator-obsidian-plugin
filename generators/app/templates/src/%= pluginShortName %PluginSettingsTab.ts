import { Setting } from 'obsidian';
import { PluginSettingsTabBase } from 'obsidian-dev-utils/obsidian/Plugin/PluginSettingsTabBase';
import { extend } from 'obsidian-dev-utils/obsidian/Plugin/ValueComponent';

import type <%= pluginShortName %>Plugin from './<%= pluginShortName %>Plugin.ts';

export default class <%= pluginShortName %>PluginSettingsTab extends PluginSettingsTabBase<<%= pluginShortName %>Plugin> {
  public override display(): void {
    this.containerEl.empty();

    new Setting(this.containerEl)
      .setName('Test Setting')
      .setDesc('This is a test setting.')
      .addText((text) =>
        extend(text)
          .bind(this.plugin, 'testSetting', {
            onChanged: () => { this.display(); },
            valueValidator: (uiValue) => uiValue.length > 0 ? null : 'Value must be non-empty',
            pluginSettingsToComponentValueConverter: (pluginSettingsValue: string) => pluginSettingsValue + ' (converted)',
            componentToPluginSettingsValueConverter: (uiValue: string) => uiValue.replace(' (converted)', '')
          })
          .setPlaceholder('Enter a value')
      );
  }
}
