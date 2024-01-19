import Generator from "yeoman-generator";
import chalkModule from "chalk";
import yosay from "yosay";
import type { PromptQuestions } from "../../node_modules/yeoman-generator/dist/questions.d.ts";

const chalk = chalkModule.default;

function makePluginName(pluginId: string): string {
  return extractWords(pluginId).join(" ");
}

function extractWords(pluginId: string): string[] {
  return pluginId.split("-").map(toPascalCase);
}

function toPascalCase(word: string): string {
  return (word[0] ?? "").toUpperCase() + word.substring(1);
}

function makePluginClassName(pluginId: string): string {
  return extractWords(pluginId).concat("Plugin").join("");
}

function nameof<T>(name: Extract<keyof T, string>): string {
  return name;
}

interface Answers {
  pluginId: string;
  pluginName: string;
  pluginDescription: string;
  pluginClassName: string;
  currentYear: number;
  authorName: string;
  authorGitHubName: string;
  isDesktopOnly: boolean;
  hasStyles: boolean;
}

export default class extends Generator {
  private answers!: Answers;

  public async prompting(): Promise<void> {
    this.log(
      yosay(
        `Welcome to the ${chalk.red("generator-obsidian-plugin")} generator!`,
      ),
    );

    const questions: PromptQuestions<Answers> = [
      {
        type: "input",
        name: nameof<Answers>("pluginId"),
        message: "Your plugin's id?",
        default: this.appname.replace(/^obsidian-/, ""),
        validate(pluginId: string): boolean | string {
          if (!pluginId) {
            return "Should not be empty";
          }

          if (!/^[a-z0-9-]+$/.test(pluginId)) {
            return "Should contain only lowercase English letters, digits and hyphens";
          }

          if (!/^[a-z]+/.test(pluginId[0]!)) {
            return "Should start with the letter";
          }

          if (!/^[a-z0-9]+/.test(pluginId.at(-1)!)) {
            return "Should end with the letter or digit";
          }

          if (pluginId.startsWith("obsidian-")) {
            return "Should not start with `obsidian-`";
          }

          return true;
        },
      },
      {
        type: "input",
        name: nameof<Answers>("pluginName"),
        message: "Your plugin's name?",
        default: (answers: Answers) => makePluginName(answers.pluginId),
      },
      {
        type: "input",
        name: nameof<Answers>("pluginDescription"),
        message: "Your plugin's description?",
        default: "Does something awesome",
      },
      {
        type: "input",
        name: nameof<Answers>("authorName"),
        message: "Your full name?",
        default: "John Doe",
      },
      {
        type: "input",
        name: nameof<Answers>("authorGitHubName"),
        message: "Your GitHub name?",
        default: "johndoe",
      },
      {
        type: "confirm",
        name: nameof<Answers>("isDesktopOnly"),
        message: "Is your plugin for Desktop only?",
        default: true,
      },
      {
        type: "confirm",
        name: nameof<Answers>("hasStyles"),
        message: "Does your plugin need CSS styles?",
        default: false,
      },
    ];

    this.answers = await this.prompt(questions);
    this.answers.currentYear = new Date().getFullYear();
    this.answers.pluginClassName = makePluginClassName(this.answers.pluginId);
  }

  public writing(): void {
    const map = new Map([
      ["src/main.ts", ""],
      ["src/pluginClassName.ts", `src/${this.answers.pluginClassName}.ts`],
      [".editorconfig", ""],
      [".gitattributes", ""],
      [".gitignore.template", ".gitignore"],
      [".hotreload", ""],
      [".npmrc.template", ".npmrc"],
      ["esbuild.config.ts", ""],
      ["eslint.config.ts", ""],
      ["eslint.config.fix.d.ts", ""],
      ["LICENSE", ""],
      ["manifest.json", ""],
      ["package.json", ""],
      ["README.md", ""],
      ["styles.css", this.answers.hasStyles ? "" : null],
      ["tsconfig.json", ""],
      ["version-bump.ts", ""],
      ["versions.json", ""],
    ]);

    for (const [templatePath, mappedDestinationPath] of map) {
      if (mappedDestinationPath === null) {
        continue;
      }

      const destinationPath =
        mappedDestinationPath === "" ? templatePath : mappedDestinationPath;

      this.fs.copyTpl(
        this.templatePath(templatePath),
        this.destinationPath(destinationPath),
        this.answers,
      );
    }
  }
}
