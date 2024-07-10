# generator-obsidian-plugin [![NPM version][npm-image]][npm-url]

> Obsidian Plugin Bootstrap

## Installation

For template generator to be fully working it requires [Node.js](https://nodejs.org/) v18 or higher.

First, install [Yeoman](http://yeoman.io) and generator-obsidian-plugin using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-obsidian-plugin
```

Then generate your new project:

```bash
yo obsidian-plugin
```

## Features of this template

- Enables [unofficial](https://github.com/Fevol/obsidian-typings/) TypeScript typings to the internal [Obsidian](https://obsidian.md/) API.
- Code style is forced via [`ESLint`](https://eslint.org/).
- Available commands:
  - `npm run build`: builds the production version of `main.js` ready for publishing the release.

  - `npm run dev`: builds the development version of `main.js`.

    - If the environment variable `OBSIDIAN_CONFIG_DIR` is set to something like `path/to/my/vault/.obsidian`, the command automatically copies the compiled version of the plugin there and triggers the [Hot Reload](https://github.com/pjeby/hot-reload) plugin if it is installed.

  - `npm run lint`: verifies the code style and automatically fixes some of the issues.

  - `npm version <1.2.3|patch|minor|major>`: updates the plugin version, sets `manifest.minAppVersion` to the latest `Obsidian` version, ensures it is ready for release, and publishes it. Requires [GitHub CLI](https://cli.github.com/) to be installed.

## License

 © [Michael Naumov](https://github.com/mnaoumov/)

[npm-image]: https://badge.fury.io/js/generator-obsidian-plugin.svg
[npm-url]: https://npmjs.org/package/generator-obsidian-plugin
