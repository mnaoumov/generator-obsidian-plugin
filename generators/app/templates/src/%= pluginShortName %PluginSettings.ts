export default class <%= pluginShortName %>PluginSettings {
  public testSetting: string = "defaultValue";

  public static load(data: unknown): <%= pluginShortName %>PluginSettings {
    return <%= pluginShortName %>PluginSettings.clone(data as <%= pluginShortName %>PluginSettings);
  }

  public static clone(settings?: <%= pluginShortName %>PluginSettings): <%= pluginShortName %>PluginSettings {
    const target = new <%= pluginShortName %>PluginSettings();
    if (settings) {
      for (const key of Object.keys(target) as Array<keyof <%= pluginShortName %>PluginSettings>) {
        if (key in settings && typeof settings[key] === typeof target[key]) {
          target[key] = settings[key];
        }
      }
    }

    return target;
  }
}
