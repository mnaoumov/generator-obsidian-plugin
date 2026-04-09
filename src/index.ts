/**
 * @file
 *
 * Yeoman generator for scaffolding Obsidian plugins.
 */
import type {
  BaseEnvironment,
  QueuedAdapter
} from '@yeoman/types';

import chalk from 'chalk';
import { readdir } from 'node:fs/promises';
import {
  basename,
  dirname,
  join,
  relative
} from 'node:path';
import { fileURLToPath } from 'node:url';
import { compare } from 'semver';
import Generator from 'yeoman-generator';
import yosay from 'yosay';

// eslint-disable-next-line import-x/no-relative-packages -- yeoman-generator does not export PromptQuestions from its public API.
import type { PromptQuestions } from '../node_modules/yeoman-generator/dist/questions.d.ts';

const minimumNodeVersion = '18.0.0';
if (compare(process.version, minimumNodeVersion) < 0) {
  console.error(`You need Node.js version ${minimumNodeVersion} or higher to use this generator.`);
  process.exit(1);
}

interface Answers {
  authorGitHubName: string;
  authorName: string;
  currentYear: number;
  fundingUrl: string;
  isDesktopOnly: boolean;
  pluginDescription: string;
  pluginId: string;
  pluginName: string;
  pluginShortName: string;
  shouldEnableUnofficialInternalObsidianApi: boolean;
}

interface Environment extends BaseEnvironment<QueuedAdapter> {
  options: {
    nodePackageManager: string;
  };
}

interface NpmRegistryResponse {
  version: string;
}

/**
 * Yeoman generator that scaffolds a new Obsidian plugin project.
 */
// eslint-disable-next-line import-x/no-default-export -- Yeoman generators require a default export.
export default class ObsidianPluginGenerator extends Generator {
  /** The Yeoman environment with typed options. */
  // eslint-disable-next-line no-restricted-syntax -- Override parent class type with a more specific Environment interface.
  declare public env: Environment;
  private _answers?: Answers;

  private get answers(): Answers {
    if (!this._answers) {
      throw new Error('Answers not initialized. prompting() must run before accessing answers.');
    }
    return this._answers;
  }

  /** Prompts the user for plugin configuration. */
  public async prompting(): Promise<void> {
    const currentGeneratorVersion = this.rootGeneratorVersion();
    this.log(
      yosay(
        `Welcome to the ${chalk.red(`generator-obsidian-plugin v${currentGeneratorVersion}`)} generator!`
      )
    );

    const latestGeneratorVersion = await latestVersion('generator-obsidian-plugin');

    if (compare(currentGeneratorVersion, latestGeneratorVersion) < 0) {
      console.warn(
        `Your generator version is outdated. The latest generator version is ${
          chalk.green(latestGeneratorVersion)
        }. You can update your generator by running \`npm update -g generator-obsidian-plugin\`.`
      );
      const { shouldRunOutdatedGenerator } = await this.prompt({
        default: false,
        message: 'Do you want to run the outdated generator?',
        name: 'shouldRunOutdatedGenerator',
        type: 'confirm'
      } as PromptQuestions<{ shouldRunOutdatedGenerator: boolean }>);

      if (!shouldRunOutdatedGenerator) {
        process.exit(1);
      }
    }

    const questions: PromptQuestions<Answers> = [
      {
        default: basename(this._destinationRoot.replaceAll('\\', '/')).replace(/^obsidian-/, ''),
        message: 'Your plugin\'s id?',
        name: 'pluginId' satisfies keyof Answers,
        type: 'input',
        validate(pluginId: string): boolean | string {
          if (!pluginId) {
            return 'Should not be empty';
          }

          if (!/^[a-z0-9-]+$/.test(pluginId)) {
            return 'Should contain only lowercase English letters, digits and hyphens';
          }

          if (!/^[a-z]+/.test(pluginId[0] ?? '')) {
            return 'Should start with the letter';
          }

          if (!/^[a-z0-9]+/.test(pluginId.at(-1) ?? '')) {
            return 'Should end with the letter or digit';
          }

          if (pluginId.startsWith('obsidian-')) {
            return 'Should not start with `obsidian-`';
          }

          return true;
        }
      },
      {
        default: (answers: Partial<Answers>) => makePluginName(answers.pluginId ?? ''),
        message: 'Your plugin\'s name?',
        name: 'pluginName' satisfies keyof Answers,
        type: 'input'
      },
      {
        default: 'Does something awesome.',
        message: 'Your plugin\'s description?',
        name: 'pluginDescription' satisfies keyof Answers,
        type: 'input',
        validate(pluginDescription: string): boolean | string {
          if (!pluginDescription.endsWith('.')) {
            return 'Should end with a dot';
          }

          return true;
        }
      },
      {
        default: 'John Doe',
        message: 'Your full name?',
        name: 'authorName' satisfies keyof Answers,
        type: 'input'
      },
      {
        default: 'johndoe',
        message: 'Your GitHub name?',
        name: 'authorGitHubName' satisfies keyof Answers,
        type: 'input'
      },
      {
        default: true,
        message: 'Is your plugin for Desktop only?',
        name: 'isDesktopOnly' satisfies keyof Answers,
        type: 'confirm'
      },
      {
        default: '',
        message: 'Funding URL (leave empty if not needed)',
        name: 'fundingUrl' satisfies keyof Answers,
        type: 'input'
      },
      {
        default: false,
        message: 'Should enable unofficial internal obsidian API (only for advanced users)?',
        name: 'shouldEnableUnofficialInternalObsidianApi' satisfies keyof Answers,
        type: 'confirm'
      }
    ];

    this._answers = await this.prompt(questions);
    this.answers.currentYear = new Date().getFullYear();
    this.answers.pluginShortName = extractWords(this.answers.pluginId).join('');
  }

  /** Copies and processes template files into the destination directory. */
  public async writing(): Promise<void> {
    this.env.options.nodePackageManager = 'npm';

    const folderName = dirname(fileURLToPath(import.meta.url));
    const templatesDir = join(folderName, 'templates');

    for (const dirent of await readdir(templatesDir, { recursive: true, withFileTypes: true })) {
      if (dirent.isDirectory()) {
        continue;
      }

      const templatePath = join(relative(templatesDir, dirent.parentPath), dirent.name);
      const destinationPath = getDestinationPath(templatePath, this.answers);
      if (!destinationPath) {
        continue;
      }

      this.fs.copyTpl(
        this.templatePath(templatePath),
        this.destinationPath(destinationPath),
        this.answers
      );
    }
  }
}

function extractWords(pluginId: string): string[] {
  return pluginId.split('-').map(toPascalCase);
}

function getDestinationPath(templatePath: string, answers: Answers): null | string {
  templatePath = templatePath.replaceAll(
    /%= (?<AnswerKey>.+?) %/g,
    (_match: string, answerKey: number | string) => String(answers[String(answerKey) as keyof Answers])
  );

  if (templatePath.endsWith('.noext')) {
    return templatePath.slice(0, -'.noext'.length);
  }

  return templatePath;
}

async function latestVersion(packageName: string): Promise<string> {
  const response = await fetch(`https://registry.npmjs.org/${packageName}/latest`);
  const json = (await response.json()) as Partial<NpmRegistryResponse> | undefined;

  if (!json?.version) {
    throw new Error(`Invalid response from npm registry for ${packageName}`);
  }

  return json.version;
}

function makePluginName(pluginId: string): string {
  return extractWords(pluginId).join(' ');
}

function toPascalCase(word: string): string {
  return (word[0] ?? '').toUpperCase() + word.slice(1);
}
