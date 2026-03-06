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
      .setName('Button setting name')
      .setDesc('Button setting description.')
      .addButton((button) => {
        button.setButtonText('Button text')
          .onClick(() => {
            new Notice('Button clicked');
          });
      });

    new SettingEx(this.containerEl)
      .setName('Checkbox setting name')
      .setDesc('Checkbox setting description.')
      .addCheckbox((checkbox) => {
        this.bind(checkbox, 'checkboxSetting');
      });

    new SettingEx(this.containerEl)
      .setName('Code highlighter setting name')
      .setDesc('Code highlighter setting description.')
      .addCodeHighlighter((codeHighlighter) => {
        codeHighlighter.setLanguage('javascript');
        this.bind(codeHighlighter, 'codeHighlighterSetting');
      });

    new SettingEx(this.containerEl)
      .setName('Color setting name')
      .setDesc('Color setting description.')
      .addColorPicker((color) => {
        this.bind(color, 'colorSetting');
      });

    new SettingEx(this.containerEl)
      .setName('Date setting name')
      .setDesc('Date setting description.')
      .addDate((date) => {
        this.bind(date, 'dateSetting');
      });

    new SettingEx(this.containerEl)
      .setName('Date time setting name')
      .setDesc('Date time setting description.')
      .addDateTime((dateTime) => {
        this.bind(dateTime, 'dateTimeSetting');
      });

    new SettingEx(this.containerEl)
      .setName('Dropdown setting name')
      .setDesc('Dropdown setting description.')
      .addDropdown((dropdown) => {
        dropdown.addOptions({
          Value1: 'Display 1',
          Value2: 'Display 2',
          Value3: 'Display 3'
        });
        this.bind(dropdown, 'dropdownSetting');
      });

    new SettingEx(this.containerEl)
      .setName('Email setting name')
      .setDesc('Email setting description.')
      .addEmail((email) => {
        this.bind(email, 'emailSetting');
      });

    new SettingEx(this.containerEl)
      .setName('Extra button setting name')
      .setDesc('Extra button setting description.')
      .addExtraButton((extraButton) => {
        extraButton
          .onClick(() => {
            new Notice('Extra button clicked');
          });
      });

    new SettingEx(this.containerEl)
      .setName('File setting name')
      .setDesc('File setting description.')
      .addFile((file) => {
        file.onChange((value) => {
          new Notice(`File selected: ${value?.name ?? '(None)'}`);
        });
      });

    new SettingEx(this.containerEl)
      .setName('Moment format setting name')
      .setDesc('Moment format setting description.')
      .addMomentFormat((momentFormat) => {
        this.bind(momentFormat, 'momentFormatSetting');
      });

    new SettingEx(this.containerEl)
      .setName('Month setting name')
      .setDesc('Month setting description.')
      .addMonth((month) => {
        this.bind(month, 'monthSetting');
      });

    new SettingEx(this.containerEl)
      .setName('Multiple dropdown setting name')
      .setDesc('Multiple dropdown setting description.')
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
      .setName('Multiple email setting name')
      .setDesc('Multiple email setting description.')
      .addMultipleEmail((multipleEmail) => {
        this.bind(multipleEmail, 'multipleEmailSetting');
      });

    new SettingEx(this.containerEl)
      .setName('Multiple file setting name')
      .setDesc('Multiple file setting description.')
      .addMultipleFile((multipleFile) => {
        multipleFile.onChange((value) => {
          const fileNames = value.map((file) => file.name);
          new Notice(`Files selected: ${fileNames.join(', ')}`);
        });
      });

    new SettingEx(this.containerEl)
      .setName('Multiple text setting name')
      .setDesc('Multiple text setting description.')
      .addMultipleText((multipleText) => {
        this.bind(multipleText, 'multipleTextSetting');
      });

    new SettingEx(this.containerEl)
      .setName('Number setting name')
      .setDesc('Number setting description.')
      .addNumber((number) => {
        this.bind(number, 'numberSetting');
      });

    new SettingEx(this.containerEl)
      .setName('Progress bar setting name')
      .setDesc('Progress bar setting description.')
      .addProgressBar((progressBar) => {
        progressBar.setValue(this.plugin.settings.progressBarSetting);
      });

    new SettingEx(this.containerEl)
      .setName('Search setting name')
      .setDesc('Search setting description.')
      .addSearch((search) => {
        this.bind(search, 'searchSetting');
      });

    new SettingEx(this.containerEl)
      .setName('Slider setting name')
      .setDesc('Slider setting description.')
      .addSlider((slider) => {
        this.bind(slider, 'sliderSetting');
      });

    new SettingEx(this.containerEl)
      .setName('Text setting name')
      .setDesc('Text setting description.')
      .addText((text) => {
        this.bind(text, 'textSetting');
      });

    new SettingEx(this.containerEl)
      .setName('Text area setting name')
      .setDesc('Text area setting description.')
      .addTextArea((textArea) => {
        this.bind(textArea, 'textAreaSetting');
      });

    new SettingEx(this.containerEl)
      .setName('Time setting name')
      .setDesc('Time setting description.')
      .addTime((time) => {
        this.bind(time, 'timeSetting');
      });

    new SettingEx(this.containerEl)
      .setName('Toggle setting name')
      .setDesc('Toggle setting description.')
      .addToggle((toggle) => {
        this.bind(toggle, 'toggleSetting');
      });

    new SettingEx(this.containerEl)
      .setName('Tri-state checkbox setting name')
      .setDesc('Tri-state checkbox setting description.')
      .addTriStateCheckbox((triStateCheckbox) => {
        this.bind(triStateCheckbox, 'triStateCheckboxSetting');
      });

    new SettingEx(this.containerEl)
      .setName('Typed dropdown setting name')
      .setDesc('Typed dropdown setting description.')
      .addTypedDropdown((typedDropdown) => {
        const map = new Map<TypedItem, string>();
        map.set(TypedItem.Foo, 'Display Foo');
        map.set(TypedItem.Bar, 'Display Bar');
        map.set(TypedItem.Baz, 'Display Baz');
        typedDropdown.addOptions(map);
        this.bind(typedDropdown, 'typedDropdownSetting', {
          onChanged(newValue, oldValue) {
            console.warn('Typed Dropdown setting changed', { newValue, oldValue });
          }
        });
      });

    new SettingEx(this.containerEl)
      .setName('Typed multiple dropdown setting name')
      .setDesc('Typed multiple dropdown setting description.')
      .addTypedMultipleDropdown((typedMultipleDropdown) => {
        const map = new Map<TypedItem, string>();
        map.set(TypedItem.Foo, 'Display Foo');
        map.set(TypedItem.Bar, 'Display Bar');
        map.set(TypedItem.Baz, 'Display Baz');
        typedMultipleDropdown.addOptions(map);
        this.bind(typedMultipleDropdown, 'typedMultipleDropdownSetting', {
          onChanged(newValue, oldValue) {
            console.warn('Typed Multiple Dropdown setting changed', { newValue, oldValue });
          }
        });
      });

    new SettingEx(this.containerEl)
      .setName('URL setting name')
      .setDesc('URL setting description.')
      .addUrl((url) => {
        this.bind(url, 'urlSetting');
      });

    new SettingEx(this.containerEl)
      .setName('Week setting name')
      .setDesc('Week setting description.')
      .addWeek((week) => {
        this.bind(week, 'weekSetting');
      });

    new SettingEx(this.containerEl)
      .setName('Advanced text setting name')
      .setDesc('Advanced text setting description.')
      .addText((text) => {
        this.bind(text, 'textSetting', {
          componentToPluginSettingsValueConverter: (uiValue: string) => uiValue.replace(' (converted)', ''),
          onChanged: () => {
            new Notice('Advanced text setting changed');
          },
          pluginSettingsToComponentValueConverter: (pluginSettingsValue: string) => `${pluginSettingsValue} (converted)`
        })
          .setPlaceholder('Enter a value');
      });
  }
}
