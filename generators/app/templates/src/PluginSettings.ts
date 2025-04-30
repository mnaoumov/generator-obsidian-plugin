import type { Duration } from 'moment';
import type { IsoMonth } from 'obsidian-dev-utils/obsidian/Components/SettingComponents/MonthComponent';
import type { IsoWeek } from 'obsidian-dev-utils/obsidian/Components/SettingComponents/WeekComponent';

import { duration } from 'moment';

export class PluginSettings {
  /* eslint-disable no-magic-numbers */
  public checkboxSetting = true;
  public codeHighlighterSetting = `function foo() {
  console.log('bar');
}`;

  public colorSetting = '#123456';
  public dateSetting = new Date();
  public dateTimeSetting = new Date();
  public dropdownSetting = 'Value2';
  public emailSetting = 'defaultEmail@example.com';
  public momentFormatSetting = 'YYYY-MM-DD';
  public monthSetting: IsoMonth = {
    month: 2,
    year: 2025
  };

  public multipleDropdownSetting: readonly string[] = ['Value2', 'Value5'];
  public multipleEmailSetting: readonly string[] = ['defaultEmail@example.com', 'defaultEmail2@example.com'];
  public multipleTextSetting: readonly string[] = ['defaultText1', 'defaultText2', 'defaultText3'];
  public numberSetting = 123;
  public progressBarSetting = 50;
  public searchSetting = 'defaultSearch';
  public sliderSetting = 50;
  public textAreaSetting = 'defaultTextArea';
  public textSetting = 'defaultText';
  public timeSetting: Duration = duration({ hours: 12, minutes: 34 });
  public toggleSetting = true;
  public triStateCheckboxSetting: boolean | null = null;
  public typedDropdownSetting: TypedItem = TypedItem.Foo;
  public typedMultipleDropdownSetting: readonly TypedItem[] = [TypedItem.Bar, TypedItem.Baz];
  public urlSetting = 'https://example.com';

  public weekSetting: IsoWeek = {
    weekNumber: 6,
    year: 2025
  };

  /* eslint-enable no-magic-numbers */
}

// eslint-disable-next-line perfectionist/sort-modules
export class TypedItem {
  public static readonly Bar = new TypedItem('Bar');
  public static readonly Baz = new TypedItem('Baz');
  public static readonly Foo = new TypedItem('Foo');

  public constructor(public readonly name: string) {}

  public static deserialize(name: string): TypedItem {
    const items = [TypedItem.Bar, TypedItem.Baz, TypedItem.Foo];
    const item = items.find((i) => i.name === name);

    if (item === undefined) {
      throw new Error(`Unknown item: ${name}`);
    }

    return item;
  }
}
