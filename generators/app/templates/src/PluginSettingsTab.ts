import { Notice } from 'obsidian';
import { PluginSettingsTabBase } from 'obsidian-dev-utils/obsidian/Plugin/PluginSettingsTabBase';
import { SettingEx } from 'obsidian-dev-utils/obsidian/SettingEx';

import type { PluginTypes } from './PluginTypes.ts';

import { TypedItem } from './PluginSettings.ts';

export class PluginSettingsTab extends PluginSettingsTabBase<PluginTypes> {
  public override display(): void {
    super.display();
    this.containerEl.empty();

    new SettingEx(this.containerEl)
      .setName('Button Setting Name')
      .setDesc('Button Setting Description.')
      .addButton((button) => {
        button.setButtonText('Button Text')
          .onClick(() => {
            new Notice('Button clicked');
          });
      });

    new SettingEx(this.containerEl)
      .setName('Checkbox Setting Name')
      .setDesc('Checkbox Setting Description.')
      .addCheckbox((checkbox) => {
        this.bind(checkbox, 'checkboxSetting');
      });

    new SettingEx(this.containerEl)
      .setName('Code Highlighter Setting Name')
      .setDesc('Code Highlighter Setting Description.')
      .addCodeHighlighter((codeHighlighter) => {
        codeHighlighter.setLanguage('javascript');
        this.bind(codeHighlighter, 'codeHighlighterSetting');
      });

    new SettingEx(this.containerEl)
      .setName('Color Setting Name')
      .setDesc('Color Setting Description.')
      .addColorPicker((color) => {
        this.bind(color, 'colorSetting');
      });

    new SettingEx(this.containerEl)
      .setName('Date Setting Name')
      .setDesc('Date Setting Description.')
      .addDate((date) => {
        this.bind(date, 'dateSetting');
      });

    new SettingEx(this.containerEl)
      .setName('DateTime Setting Name')
      .setDesc('DateTime Setting Description.')
      .addDateTime((dateTime) => {
        this.bind(dateTime, 'dateTimeSetting');
      });

    new SettingEx(this.containerEl)
      .setName('Dropdown Setting Name')
      .setDesc('Dropdown Setting Description.')
      .addDropdown((dropdown) => {
        dropdown.addOptions({
          Value1: 'Display 1',
          Value2: 'Display 2',
          Value3: 'Display 3'
        });
        this.bind(dropdown, 'dropdownSetting');
      });

    new SettingEx(this.containerEl)
      .setName('Email Setting Name')
      .setDesc('Email Setting Description.')
      .addEmail((email) => {
        this.bind(email, 'emailSetting');
      });

    new SettingEx(this.containerEl)
      .setName('Extra Button Setting Name')
      .setDesc('Extra Button Setting Description.')
      .addExtraButton((extraButton) => {
        extraButton
          .onClick(() => {
            new Notice('Extra Button clicked');
          });
      });

    new SettingEx(this.containerEl)
      .setName('File Setting Name')
      .setDesc('File Setting Description.')
      .addFile((file) => {
        file.onChange((value) => {
          new Notice(`File selected: ${value?.name ?? '(None)'}`);
        });
      });

    new SettingEx(this.containerEl)
      .setName('Moment Format Setting Name')
      .setDesc('Moment Format Setting Description.')
      .addMomentFormat((momentFormat) => {
        this.bind(momentFormat, 'momentFormatSetting');
      });

    new SettingEx(this.containerEl)
      .setName('Month Setting Name')
      .setDesc('Month Setting Description.')
      .addMonth((month) => {
        this.bind(month, 'monthSetting');
      });

    new SettingEx(this.containerEl)
      .setName('Multiple Dropdown Setting Name')
      .setDesc('Multiple Dropdown Setting Description.')
      .addMultipleDropdown((multipleDropdown) => {
        multipleDropdown.addOptions({
          Value1: 'Display 1',
          Value2: 'Display 2',
          Value3: 'Display 3',
          Value4: 'Display 4',
          Value5: 'Display 5'
        });

        this.bind(multipleDropdown, 'multipleDropdownSetting');
      });

    new SettingEx(this.containerEl)
      .setName('Multiple Email Setting Name')
      .setDesc('Multiple Email Setting Description.')
      .addMultipleEmail((multipleEmail) => {
        this.bind(multipleEmail, 'multipleEmailSetting');
      });

    new SettingEx(this.containerEl)
      .setName('Multiple File Setting Name')
      .setDesc('Multiple File Setting Description.')
      .addMultipleFile((multipleFile) => {
        multipleFile.onChange((value) => {
          const fileNames = value.map((file) => file.name);
          new Notice(`Files selected: ${fileNames.join(', ')}`);
        });
      });

    new SettingEx(this.containerEl)
      .setName('Multiple Text Setting Name')
      .setDesc('Multiple Text Setting Description.')
      .addMultipleText((multipleText) => {
        this.bind(multipleText, 'multipleTextSetting');
      });

    new SettingEx(this.containerEl)
      .setName('Number Setting Name')
      .setDesc('Number Setting Description.')
      .addNumber((number) => {
        this.bind(number, 'numberSetting');
      });

    new SettingEx(this.containerEl)
      .setName('ProgressBar Setting Name')
      .setDesc('ProgressBar Setting Description.')
      .addProgressBar((progressBar) => {
        progressBar.setValue(this.plugin.settings.progressBarSetting);
      });

    new SettingEx(this.containerEl)
      .setName('Search Setting Name')
      .setDesc('Search Setting Description.')
      .addSearch((search) => {
        this.bind(search, 'searchSetting');
      });

    new SettingEx(this.containerEl)
      .setName('Slider Setting Name')
      .setDesc('Slider Setting Description.')
      .addSlider((slider) => {
        this.bind(slider, 'sliderSetting');
      });

    new SettingEx(this.containerEl)
      .setName('Text Setting Name')
      .setDesc('Text Setting Description.')
      .addText((text) => {
        this.bind(text, 'textSetting');
      });

    new SettingEx(this.containerEl)
      .setName('Text Area Setting Name')
      .setDesc('Text Area Setting Description.')
      .addTextArea((textArea) => {
        this.bind(textArea, 'textAreaSetting');
      });

    new SettingEx(this.containerEl)
      .setName('Time Setting Name')
      .setDesc('Time Setting Description.')
      .addTime((time) => {
        this.bind(time, 'timeSetting');
      });

    new SettingEx(this.containerEl)
      .setName('Toggle Setting Name')
      .setDesc('Toggle Setting Description.')
      .addToggle((toggle) => {
        this.bind(toggle, 'toggleSetting');
      });

    new SettingEx(this.containerEl)
      .setName('Tri-state Checkbox Setting Name')
      .setDesc('Tri-state Checkbox Setting Description.')
      .addTriStateCheckbox((triStateCheckbox) => {
        this.bind(triStateCheckbox, 'triStateCheckboxSetting');
      });

    new SettingEx(this.containerEl)
      .setName('Typed Dropdown Setting Name')
      .setDesc('Typed Dropdown Setting Description.')
      .addTypedDropdown((typedDropdown) => {
        const map = new Map<TypedItem, string>();
        map.set(TypedItem.Foo, 'Display Foo');
        map.set(TypedItem.Bar, 'Display Bar');
        map.set(TypedItem.Baz, 'Display Baz');
        typedDropdown.addOptions(map);
        this.bind(typedDropdown, 'typedDropdownSetting', {
          onChanged(newValue, oldValue) {
            console.warn('Typed Dropdown Setting changed', { newValue, oldValue });
          }
        });
      });

    new SettingEx(this.containerEl)
      .setName('Typed Multiple Dropdown Setting Name')
      .setDesc('Typed Multiple Dropdown Setting Description.')
      .addTypedMultipleDropdown((typedMultipleDropdown) => {
        const map = new Map<TypedItem, string>();
        map.set(TypedItem.Foo, 'Display Foo');
        map.set(TypedItem.Bar, 'Display Bar');
        map.set(TypedItem.Baz, 'Display Baz');
        typedMultipleDropdown.addOptions(map);
        this.bind(typedMultipleDropdown, 'typedMultipleDropdownSetting', {
          onChanged(newValue, oldValue) {
            console.warn('Typed Multiple Dropdown Setting changed', { newValue, oldValue });
          }
        });
      });

    new SettingEx(this.containerEl)
      .setName('Url Setting Name')
      .setDesc('Url Setting Description.')
      .addUrl((url) => {
        this.bind(url, 'urlSetting');
      });

    new SettingEx(this.containerEl)
      .setName('Week Setting Name')
      .setDesc('Week Setting Description.')
      .addWeek((week) => {
        this.bind(week, 'weekSetting');
      });

    new SettingEx(this.containerEl)
      .setName('Advanced Text Setting Name')
      .setDesc('Advanced Text Setting Description.')
      .addText((text) => {
        this.bind(text, 'textSetting', {
          componentToPluginSettingsValueConverter: (uiValue: string) => uiValue.replace(' (converted)', ''),
          onChanged: () => {
            new Notice('Advanced Text Setting changed');
          },
          pluginSettingsToComponentValueConverter: (pluginSettingsValue: string) => `${pluginSettingsValue} (converted)`
        })
          .setPlaceholder('Enter a value');
      });
  }
}
