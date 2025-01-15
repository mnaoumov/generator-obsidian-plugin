import type {
  BaseEnvironment,
  QueuedAdapter
} from '@yeoman/types';

import chalk from 'chalk';
import latestVersion from 'latest-version';
import { addAlias } from 'module-alias';
import { nameof } from 'obsidian-dev-utils/Object';
import {
  basename,
  getDirname,
  join,
  toPosixPath
} from 'obsidian-dev-utils/Path';
import { readdirPosix } from 'obsidian-dev-utils/scripts/Fs';
import { replaceAll } from 'obsidian-dev-utils/String';
import { satisfies } from 'semver';
import Generator from 'yeoman-generator';
import yosay from 'yosay';

// eslint-disable-next-line import-x/no-relative-packages
import type { PromptQuestions } from '../node_modules/yeoman-generator/dist/questions.d.ts';

addAlias('clone-stats', 'clone-stats-node22');

const minimumNodeVersion = '18.0.0';
if (!satisfies(process.version, `>=${minimumNodeVersion}`)) {
  console.error(`You need Node.js version ${minimumNodeVersion} or higher to use this generator.`);
  process.exit(1);
}

interface Answers {
  authorGitHubName: string;
  authorName: string;
  currentYear: number;
  fundingUrl: string;
  hasStyles: boolean;
  isDesktopOnly: boolean;
  pluginDescription: string;
  pluginId: string;
  pluginName: string;
  pluginShortName: string;
}

interface Environment extends BaseEnvironment<QueuedAdapter> {
  options: {
    nodePackageManager: string;
  };
}

// eslint-disable-next-line import-x/no-default-export
export default class ObsidianPluginGenerator extends Generator {
  public declare env: Environment;
  private answers!: Answers;

  public async prompting(): Promise<void> {
    this.log(
      yosay(
        `Welcome to the ${chalk.red('generator-obsidian-plugin')} generator!`
      )
    );

    const questions: PromptQuestions<Answers> = [
      {
        default: basename(toPosixPath(this._destinationRoot)).replace(/^obsidian-/, ''),
        message: 'Your plugin\'s id?',
        name: nameof<Answers>('pluginId'),
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
        default: (answers: Answers) => makePluginName(answers.pluginId),
        message: 'Your plugin\'s name?',
        name: nameof<Answers>('pluginName'),
        type: 'input'
      },
      {
        default: 'Does something awesome',
        message: 'Your plugin\'s description?',
        name: nameof<Answers>('pluginDescription'),
        type: 'input'
      },
      {
        default: 'John Doe',
        message: 'Your full name?',
        name: nameof<Answers>('authorName'),
        type: 'input'
      },
      {
        default: 'johndoe',
        message: 'Your GitHub name?',
        name: nameof<Answers>('authorGitHubName'),
        type: 'input'
      },
      {
        default: true,
        message: 'Is your plugin for Desktop only?',
        name: nameof<Answers>('isDesktopOnly'),
        type: 'confirm'
      },
      {
        default: false,
        message: 'Does your plugin need CSS styles?',
        name: nameof<Answers>('hasStyles'),
        type: 'confirm'
      },
      {
        default: '',
        message: 'Funding URL (leave empty if not needed)',
        name: nameof<Answers>('fundingUrl'),
        type: 'input'
      }
    ];

    this.answers = await this.prompt(questions);
    this.answers.currentYear = new Date().getFullYear();
    this.answers.pluginShortName = extractWords(this.answers.pluginId).join('');
  }

  public async writing(): Promise<void> {
    this.env.options.nodePackageManager = 'npm';

    const __dirname = getDirname(import.meta.url);
    const templatesDir = join(__dirname, 'templates');

    for await (const filePath of getAllFiles(templatesDir)) {
      const templatePath = filePath.slice(templatesDir.length + 1);
      const destinationPath = getDestinationPath(templatePath, this.answers);
      if (!destinationPath) {
        continue;
      }

      if (destinationPath.endsWith('.json')) {
        const tempJsonPath = this.destinationPath(destinationPath + '.temp');
        this.fs.copyTpl(
          this.templatePath(templatePath),
          tempJsonPath,
          this.answers
        );

        const json = this.fs.readJSON(tempJsonPath) as Record<string, unknown>;
        if (destinationPath.endsWith('package.json')) {
          const devDependencies = json['devDependencies'] as Record<string, string> | undefined;
          if (devDependencies) {
            for (const [packageName, version] of Object.entries(devDependencies)) {
              if (version !== 'latest') {
                continue;
              }

              devDependencies[packageName] = '^' + await latestVersion(packageName);
            }
          }
        }
        this.fs.extendJSON(this.destinationPath(destinationPath), json);
        this.fs.delete(tempJsonPath);
      } else {
        this.fs.copyTpl(
          this.templatePath(templatePath),
          this.destinationPath(destinationPath),
          this.answers
        );
      }
    }
  }
}

function extractWords(pluginId: string): string[] {
  return pluginId.split('-').map(toPascalCase);
}

async function* getAllFiles(dirPath: string): AsyncGenerator<string, void> {
  const files = await readdirPosix(dirPath, { withFileTypes: true });

  for (const file of files) {
    const filePath = join(dirPath, file.name);
    if (file.isDirectory()) {
      yield * getAllFiles(filePath);
    } else {
      yield filePath;
    }
  }
}

function getDestinationPath(templatePath: string, answers: Answers): null | string {
  templatePath = replaceAll(templatePath, /%= (.+?) %/g, (_, answerKey: string) => String(answers[answerKey as keyof Answers]));

  if (templatePath.endsWith('.noext')) {
    return templatePath.slice(0, -'.noext'.length);
  }

  if (templatePath === 'styles.css' && !answers.hasStyles) {
    return null;
  }

  return templatePath;
}

function makePluginName(pluginId: string): string {
  return extractWords(pluginId).join(' ');
}

function toPascalCase(word: string): string {
  return (word[0] ?? '').toUpperCase() + word.slice(1);
}
