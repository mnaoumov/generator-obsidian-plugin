# <%= pluginName %>

This is a plugin for [Obsidian](https://obsidian.md/) that <%= pluginDescription %>.

## Installation

- `<%= pluginName %>` is not available in [the official Community Plugins repository](https://obsidian.md/plugins) yet.
- Beta releases can be installed through [BRAT](https://obsidian.md/plugins?id=obsidian42-brat).

## Debugging

By default, debug messages for this plugin are hidden.

To show them, run the following command:

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
