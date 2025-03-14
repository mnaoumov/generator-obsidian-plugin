# generator-obsidian-plugin [![](https://badge.fury.io/js/generator-obsidian-plugin.svg)](https://npmjs.org/package/generator-obsidian-plugin)

> Obsidian Plugin Yeoman Generator

## Installation

For template generator to be fully working it requires [Node.js](https://nodejs.org/) v18 or higher.

First, install [Yeoman](http://yeoman.io) and generator-obsidian-plugin using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-obsidian-plugin
```

Then generate your new project:

```bash
mkdir new-plugin-name
cd new-plugin-name
yo obsidian-plugin
```

## Sample output

You can see an sample output of this generator at [Sample Plugin Extended](https://github.com/mnaoumov/obsidian-sample-plugin-extended).

## Features of this template

- [Obsidian Extended Typings](https://github.com/Fevol/obsidian-typings/) for internal [Obsidian](https://obsidian.md/) API.
- Code style is forced via [`ESLint`](https://eslint.org/).
- Spell checking is forced via [`CSpell`](https://cspell.org/).
- Code formatting is forced via [`dprint`](https://dprint.dev/).
- CLI commands and code helpers from [Obsidian Dev Utils](https://github.com/mnaoumov/obsidian-dev-utils).
- Supports [svelte](https://svelte.dev/) components. See example in `src/SvelteComponents` in the generated project.
- Supports [react](https://react.dev) components. See example in `src/ReactComponents` in the generated project.
- Supports [SASS](https://sass-lang.com/) for CSS pre-processing. See example in `src/styles/main.scss` in the generated project.

### NPM Commands

The package offers several NPM commands to facilitate common development tasks:

#### Build Production Version

```bash
npm run build
```

Compiles the production version of your plugin into the `dist/build` folder.

#### Clean build folder

```bash
npm run build:clean
```

Cleans `dist` folder.

#### Compile code

```bash
npm run build:compile
```

Checks if code compiles.

#### Compile Svelte code

```bash
npm run build:compile:svelte
```

Checks if Svelte code compiles.

#### Compile TypeScript code

```bash
npm run build:compile:typeScript
```

Checks if TypeScript code compiles.

#### Build Development Version

```bash
npm run dev
```

Compiles the development version of your plugin into the `dist/dev` folder. The `OBSIDIAN_CONFIG_DIR` can be set either as an environment variable or specified in a `.env` file (e.g., `path/to/my/vault/.obsidian`). The command automatically copies the compiled plugin to the specified Obsidian configuration directory and triggers the [Hot Reload] plugin, if it is enabled. If the [Hot Reload] plugin is not installed, it will be installed automatically, and you will need to enable it manually.

#### Format Code

```bash
npm run format
```

Formats your code using [dprint](https://dprint.dev/).

#### Check Code Formatting

```bash
npm run format:check
```

Checks formatting of your code using [dprint](https://dprint.dev/).

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

If you use `beta` as `<versionUpdateType>` for your Obsidian plugin, the plugin will be deployed compatible to install with [BRAT](https://obsidian.md/plugins?id=obsidian42-brat).

## Support

<a href="https://www.buymeacoffee.com/mnaoumov" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;"></a>

## License

© [Michael Naumov](https://github.com/mnaoumov/)

[Hot Reload]: https://github.com/pjeby/hot-reload
