import { Setting } from 'obsidian';
import { PluginSettingsTabBase } from 'obsidian-dev-utils/obsidian/Plugin/PluginSettingsTabBase';

import type { <%= pluginShortName %>Plugin } from './<%= pluginShortName %>Plugin.ts';

export class <%= pluginShortName %>PluginSettingsTab extends PluginSettingsTabBase<<%= pluginShortName %>Plugin> {
  public override display(): void {
    this.containerEl.empty();

    new Setting(this.containerEl)
      .setName('Test Setting')
      .setDesc('This is a test setting.')
      .addText((text) =>
        this.bind(text, 'testSetting', {
          componentToPluginSettingsValueConverter: (uiValue: string) => uiValue.replace(' (converted)', ''),
          onChanged: () => {
            this.display();
          },
          pluginSettingsToComponentValueConverter: (pluginSettingsValue: string) => `${pluginSettingsValue} (converted)`,
          valueValidator: (uiValue) => uiValue.length > 0 ? undefined : 'Value must be non-empty'
        })
          .setPlaceholder('Enter a value')
      );
  }
}
