"use strict";
import Generator from "yeoman-generator";
import chalk from "chalk";
import yosay from "yosay";

function makePluginName(pluginId) {
  return extractWords(pluginId).join(" ");
}

function extractWords(pluginId) {
  return pluginId.split("-").map(toPascalCase);
}

function toPascalCase(word) {
  return word[0].toUpperCase() + word.substring(1);
}

function makePluginClassName(pluginId) {
  return extractWords(pluginId)
    .concat("Plugin")
    .join("");
}

export default class extends Generator {
  async prompting() {
    this.log(
      yosay(`Welcome to the ${chalk.red("generator-obsidian-plugin")} generator!`)
    );

    /** @type {Generator.Question[]} */
    const prompts = [
      {
        type: "input",
        name: "pluginId",
        message: "Your plugin's id?",
        default: this.appname.replace(/^obsidian-/, ""),
        validate: async pluginId => {
          if (!pluginId) {
            return "Should not be empty";
          }

          if (!/^[a-z0-9-]+$/.test(pluginId)) {
            return "Should contain only lowercase English letters, digits and hyphens";
          }

          if (!/^[a-z]+/.test(pluginId[0])) {
            return "Should start with the letter";
          }

          if (!/^[a-z0-9]+/.test(pluginId.at(-1))) {
            return "Should end with the letter or digit";
          }

          if (pluginId.startsWith("obsidian-")) {
            return "Should not start with `obsidian-`";
          }

          return true;
        }
      },
      {
        type: "input",
        name: "pluginName",
        message: "Your plugin's name?",
        default: answers => makePluginName(answers.pluginId)
      },
      {
        type: "input",
        name: "pluginDescription",
        message: "Your plugin's description?",
        default: "Does something awesome"
      },
      {
        type: "input",
        name: "authorName",
        message: "Your full name?",
        default: "John Doe"
      },
      {
        type: "input",
        name: "authorGitHubName",
        message: "Your GitHub name?",
        default: "johndoe"
      },
      {
        type: "confirm",
        name: "isDesktopOnly",
        message: "Is your plugin for Desktop only?",
        default: true
      },
      {
        type: "confirm",
        name: "hasStyles",
        message: "Does your plugin need CSS styles?",
        default: false
      }
    ];

    this.answers = await this.prompt(prompts);
    this.answers.currentYear = new Date().getFullYear();
    this.answers.pluginClassName = makePluginClassName(this.answers.pluginId);
  }

  writing() {
    const map = new Map([
      ["src/main.ts", ""],
      ["src/pluginClassName.ts", `src/${this.answers.pluginClassName}.ts`],
      [".editorconfig", ""],
      [".gitattributes", ""],
      [".gitignore", ""],
      [".hotreload", ""],
      [".npmrc", ""],
      ["esbuild.config.ts", ""],
      ["eslint.config.js", ""],
      ["LICENSE", ""],
      ["manifest.json", ""],
      ["package.json", ""],
      ["README.md", ""],
      ["styles.css", this.answers.hasStyles ? "" : null],
      ["tsconfig.json", ""],
      ["version-bump.ts", ""],
      ["versions.json", ""]
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
        this.answers
      );
    }
  }
}
