import type { MaybeReturn } from 'obsidian-dev-utils/Type';

import { PluginSettingsManagerBase } from 'obsidian-dev-utils/obsidian/Plugin/PluginSettingsManagerBase';

import type { PluginTypes } from './PluginTypes.ts';

import {
  PluginSettings,
  TypedItem
} from './PluginSettings.ts';

interface SerializedSettings {
  typedDropdownSetting: string;
  typedMultipleDropdownSetting: string[];
}

export class PluginSettingsManager extends PluginSettingsManagerBase<PluginTypes> {
  protected override createDefaultSettings(): PluginSettings {
    return new PluginSettings();
  }

  protected override async onLoadRecord(record: Record<string, unknown>): Promise<void> {
    await super.onLoadRecord(record);
    const serializedSettings = record as Partial<SerializedSettings>;
    const pluginSettings = record as Partial<PluginSettings>;

    if (serializedSettings.typedDropdownSetting) {
      pluginSettings.typedDropdownSetting = TypedItem.deserialize(serializedSettings.typedDropdownSetting);
    }

    if (serializedSettings.typedMultipleDropdownSetting) {
      pluginSettings.typedMultipleDropdownSetting = serializedSettings.typedMultipleDropdownSetting.map((name) => TypedItem.deserialize(name));
    }
  }

  protected override async onSavingRecord(record: Record<string, unknown>): Promise<void> {
    await super.onSavingRecord(record);
    const serializedSettings = record as Partial<SerializedSettings>;
    const pluginSettings = record as Partial<PluginSettings>;

    if (pluginSettings.typedDropdownSetting) {
      serializedSettings.typedDropdownSetting = pluginSettings.typedDropdownSetting.name;
    }

    if (pluginSettings.typedMultipleDropdownSetting) {
      serializedSettings.typedMultipleDropdownSetting = pluginSettings.typedMultipleDropdownSetting.map((item) => item.name);
    }
  }

  protected override registerValidators(): void {
    super.registerValidators();
    this.registerValidator('textSetting', (value): MaybeReturn<string> => {
      if (value === 'foo') {
        return 'Foo is not allowed';
      }
    });
  }
}
