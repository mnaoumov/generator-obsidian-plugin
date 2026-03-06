# generator-obsidian-plugin

> Obsidian Plugin Yeoman Generator

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?logo=buy-me-a-coffee&logoColor=black)](https://www.buymeacoffee.com/mnaoumov)
[![NPM package](https://badge.fury.io/js/generator-obsidian-plugin.svg)](https://npmjs.org/package/generator-obsidian-plugin)
[![GitHub release](https://img.shields.io/github/v/release/mnaoumov/generator-obsidian-plugin)](https://github.com/mnaoumov/generator-obsidian-plugin/releases)
[![GitHub downloads](https://img.shields.io/github/downloads/mnaoumov/generator-obsidian-plugin/total)](https://github.com/mnaoumov/generator-obsidian-plugin/releases)

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

This template offers several NPM commands to facilitate common development tasks:

See [documentation](https://github.com/mnaoumov/obsidian-dev-utils?tab=readme-ov-file#cli-commands) for the full list of such commands and how to extend them for your needs.

The documentation above shows usage examples in the form `npx obsidian-dev-utils foo`. This template additionally allows to call them via `npm run foo`.

<!-- markdownlint-disable MD033 -->

<a href="https://www.buymeacoffee.com/mnaoumov" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="60" width="217"></a>

<!-- markdownlint-enable MD033 -->

## My other Obsidian resources

[See my other Obsidian resources](https://github.com/mnaoumov/obsidian-resources).

## License

© [Michael Naumov](https://github.com/mnaoumov/)

[Hot Reload]: https://github.com/pjeby/hot-reload
