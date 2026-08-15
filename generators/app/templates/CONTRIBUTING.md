# Contributing

Contributions are welcome! Here's how to get started.

## Prerequisites

- [Node.js](https://nodejs.org/) (latest LTS recommended)
- npm (comes with Node.js)

## Setup

```bash
git clone https://github.com/<%= authorGitHubName %>/obsidian-<%= pluginId %>.git
cd obsidian-<%= pluginId %>
npm install
```

## Development Workflow

### Dev Mode

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
npm run lint:fix
```

### Format

```bash
npm run format:check
npm run format
```

### Spellcheck

```bash
npm run spellcheck
```

### Markdown Lint

```bash
npm run lint:md
npm run lint:md:fix
```

## Pull Requests

- Ensure all checks pass (`lint`, `format:check`, `spellcheck`, `lint:md`).
- Use [Conventional Commits](https://www.conventionalcommits.org/) for your commit messages.
