# <%= pluginName %>

This is a plugin for [Obsidian](https://obsidian.md/) that <%= pluginDescription %>

## Installation

The plugin is not available in [the official Community Plugins repository](https://obsidian.md/plugins) yet.

### Beta versions

To install the latest beta release of this plugin (regardless if it is available in [the official Community Plugins repository](https://obsidian.md/plugins) or not), follow these steps:

1. Ensure you have the [BRAT plugin](https://obsidian.md/plugins?id=obsidian42-brat) installed and enabled.
2. Click [Install via BRAT](https://intradeus.github.io/http-protocol-redirector?r=obsidian://brat?plugin=https://github.com/<%= authorGitHubName %>/obsidian-<%= pluginId %>).
3. An Obsidian pop-up window should appear. In the window, click the `Add plugin` button once and wait a few seconds for the plugin to install.

## Debugging

By default, debug messages for this plugin are hidden.

To show them, run the following command in the `DevTools Console`:

```js
window.DEBUG.enable('<%= pluginId %>');
```

For more details, refer to the [documentation](https://github.com/mnaoumov/obsidian-dev-utils?tab=readme-ov-file#debugging).

<% if (fundingUrl) { -%>
## Support

<a href="<%= fundingUrl %>" target="_blank">Support this plugin</a>

<% } -%>
## License

© [<%= authorName %>](https://github.com/<%= authorGitHubName %>/)
