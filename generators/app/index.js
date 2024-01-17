'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    this.log(
      yosay(
        `Welcome to the ${chalk.red('generator-obsidian-plugin')} generator!`
      )
    );

    const prompts = [
      {
        type: 'confirm',
        name: 'someAnswer',
        message: 'Would you like to enable this option?',
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('.'),
      this.destinationPath('.'), {
      currentYear: 1,
      authorName: "TODO authorName",
      pluginId: "TODO pluginId",
      pluginName: "TODO pluginName",
      pluginDescription: "TODO pluginDescription",
      authorGitHubName: "TODO authorGitHubName",
      isDesktopOnly: true,
      pluginPurpose: "TODO pluginPurpose",
      pluginClassName: "TODO"
    }, null, {
      globOptions: { dot: true }
    }
    );
  }

  install() {
  }
};
