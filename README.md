# generator-obsidian-plugin [![](https://badge.fury.io/js/generator-obsidian-plugin.svg)](https://npmjs.org/package/generator-obsidian-plugin)

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
- Spell checking is forced via [`CSpell`](https://cspell.org/).
- Uses CLI commands and code helpers from [Obsidian Dev Utils](https://github.com/mnaoumov/obsidian-dev-utils).

### NPM Commands

The package offers several NPM commands to facilitate common development tasks:

#### Build Production Version

```bash
npm run build
```

Compiles the production version of your plugin into the `dist/build` folder.

#### Build Development Version

```bash
npm run dev
```

Compiles the development version of your plugin into the `dist/dev` folder. The `OBSIDIAN_CONFIG_DIR` can be set either as an environment variable or specified in a `.env` file (e.g., `path/to/my/vault/.obsidian`). The command automatically copies the compiled plugin to the specified Obsidian configuration directory and triggers the [Hot Reload] plugin, if it is enabled. If the [Hot Reload] plugin is not installed, it will be installed automatically, and you will need to enable it manually.

#### Lint Code

```bash
npm run lint
```

Lints your code, enforcing a code convention to minimize common errors.

#### Lint and Fix Code

```bash
npm run lint:fix
```

Lints your code and automatically applies fixes where possible.

#### Spellcheck Code

```bash
npm run spellcheck
```

Checks your code for spelling errors.

#### Version Management

```bash
npm run version <versionUpdateType>
```

Runs build checks before updating the version and releases if all checks pass. The `<versionUpdateType>` can be `major`, `minor`, `patch`, `beta`, or a specific version like `x.y.z[-suffix]`.

## Support

<a href="https://www.buymeacoffee.com/mnaoumov" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;"></a>

## License

© [Michael Naumov](https://github.com/mnaoumov/)
