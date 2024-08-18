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

Compiles the development version of your plugin into the `dist/dev` folder. If the environment variable `OBSIDIAN_CONFIG_DIR` is set (e.g., `path/to/my/vault/.obsidian`), the command automatically copies the compiled plugin to the specified Obsidian configuration directory and triggers the [Hot Reload](https://github.com/pjeby/hot-reload) plugin, if installed.

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

## License

 © [Michael Naumov](https://github.com/mnaoumov/)

[npm-image]: https://badge.fury.io/js/generator-obsidian-plugin.svg
[npm-url]: https://npmjs.org/package/generator-obsidian-plugin
