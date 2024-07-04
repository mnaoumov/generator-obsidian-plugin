export default class <%= pluginShortName %>PluginSettings {
  public static load(value: unknown): <%= pluginShortName %>PluginSettings {
    if (!value) {
      return new <%= pluginShortName %>PluginSettings();
    }

    return value as <%= pluginShortName %>PluginSettings;
  }

  public static clone(settings?: <%= pluginShortName %>PluginSettings): <%= pluginShortName %>PluginSettings {
    return Object.assign(new <%= pluginShortName %>PluginSettings(), settings);
  }
}
