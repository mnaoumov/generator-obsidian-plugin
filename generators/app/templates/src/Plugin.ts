import type {
  Editor,
  MarkdownPostProcessorContext,
  ObsidianProtocolData,
  TAbstractFile,
  WorkspaceLeaf
} from 'obsidian';

import {
  MarkdownView,
  Notice
} from 'obsidian';
import { convertAsyncToSync } from 'obsidian-dev-utils/Async';
import { getDebugger } from 'obsidian-dev-utils/Debug';
import { alert } from 'obsidian-dev-utils/obsidian/Modals/Alert';
import { confirm } from 'obsidian-dev-utils/obsidian/Modals/Confirm';
import { prompt } from 'obsidian-dev-utils/obsidian/Modals/Prompt';
import { selectItem } from 'obsidian-dev-utils/obsidian/Modals/SelectItem';
import { PluginBase } from 'obsidian-dev-utils/obsidian/Plugin/PluginBase';

import type { PluginTypes } from './PluginTypes.ts';

import { sampleStateField } from './EditorExtensions/SampleStateField.ts';
import { sampleViewPlugin } from './EditorExtensions/SampleViewPlugin.ts';
import { SampleEditorSuggest } from './EditorSuggests/SampleEditorSuggest.ts';
import { SampleModal } from './Modals/SampleModal.ts';
import { PluginSettingsManager } from './PluginSettingsManager.ts';
import { PluginSettingsTab } from './PluginSettingsTab.ts';
import {
  SAMPLE_REACT_VIEW_TYPE,
  SampleReactView
} from './Views/SampleReactView.tsx';
import {
  SAMPLE_SVELTE_VIEW_TYPE,
  SampleSvelteView
} from './Views/SampleSvelteView.ts';
import {
  SAMPLE_VIEW_TYPE,
  SampleView
} from './Views/SampleView.ts';

export class Plugin extends PluginBase<PluginTypes> {
  protected override createSettingsManager(): PluginSettingsManager {
    return new PluginSettingsManager(this);
  }

  protected override createSettingsTab(): null | PluginSettingsTab {
    return new PluginSettingsTab(this);
  }

  protected override async onLayoutReady(): Promise<void> {
    await super.onLayoutReady();
    new Notice('This is executed after all plugins are loaded');
    await this.openView(SAMPLE_VIEW_TYPE);
    await this.openView(SAMPLE_SVELTE_VIEW_TYPE);
    await this.openView(SAMPLE_REACT_VIEW_TYPE);
  }

  protected override async onloadImpl(): Promise<void> {
    await super.onloadImpl();
    this.addCommand({
      callback: this.runSampleCommand.bind(this),
      id: 'sample-command',
      name: 'Sample command'
    });

    this.addCommand({
      editorCallback: this.runSampleEditorCommand.bind(this),
      id: 'sample-editor-command',
      name: 'Sample editor command'
    });

    this.addCommand({
      checkCallback: this.runSampleCommandWithCheck.bind(this),
      id: 'sample-command-with-check',
      name: 'Sample command with check'
    });

    this.addRibbonIcon('dice', 'Sample ribbon icon', this.runSampleRibbonIconCommand.bind(this));

    this.addStatusBarItem().setText('Sample status bar item');

    this.registerDomEvent(document, 'dblclick', this.handleSampleDomEvent.bind(this));

    this.registerEditorExtension([sampleViewPlugin, sampleStateField]);

    this.registerEditorSuggest(new SampleEditorSuggest(this.app));

    this.registerEvent(this.app.vault.on('create', this.handleSampleEvent.bind(this)));

    this.registerExtensions(['sample-extension-1', 'sample-extension-2'], SAMPLE_VIEW_TYPE);

    this.registerHoverLinkSource(SAMPLE_VIEW_TYPE, {
      defaultMod: true,
      display: this.manifest.name
    });

    const INTERVAL_IN_MILLISECONDS = 60_000;
    this.registerInterval(window.setInterval(this.handleSampleIntervalTick.bind(this), INTERVAL_IN_MILLISECONDS));

    this.registerMarkdownCodeBlockProcessor('sample-code-block-processor', this.handleSampleCodeBlockProcessor.bind(this));

    this.registerMarkdownPostProcessor(this.handleSampleMarkdownPostProcessor.bind(this));

    this.registerObsidianProtocolHandler('sample-action', this.handleSampleObsidianProtocolHandler.bind(this));

    this.registerView(SAMPLE_VIEW_TYPE, (leaf) => new SampleView(leaf));
    this.registerView(SAMPLE_SVELTE_VIEW_TYPE, (leaf) => new SampleSvelteView(leaf));
    this.registerView(SAMPLE_REACT_VIEW_TYPE, (leaf) => new SampleReactView(leaf));

    this.registerModalCommands();
  }

  private handleSampleCodeBlockProcessor(source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext): void {
    getDebugger('handleSampleCodeBlockProcessor')(source, el, ctx);
    el.setText('Sample code block processor');
  }

  private handleSampleDomEvent(evt: MouseEvent): void {
    const tagName = evt.target instanceof HTMLElement ? evt.target.tagName : '';
    new Notice(`Sample DOM event: ${tagName}`);
  }

  private handleSampleEvent(file: TAbstractFile): void {
    if (!this.app.workspace.layoutReady) {
      return;
    }

    new Notice(`Sample event: ${file.name}`);
  }

  private handleSampleIntervalTick(): void {
    new Notice('Sample interval tick');
  }

  private handleSampleMarkdownPostProcessor(el: HTMLElement, ctx: MarkdownPostProcessorContext): void {
    getDebugger('handleSampleMarkdownPostProcessor')(el, ctx);
    if (el.hasClass('el-h6')) {
      el.setText('Sample markdown post processor');
    }
  }

  private handleSampleObsidianProtocolHandler(params: ObsidianProtocolData): void {
    new Notice(`Sample obsidian protocol handler: ${params.action}`);
  }

  private async openView(viewType: string): Promise<void> {
    let leaf: null | WorkspaceLeaf;
    const leaves = this.app.workspace.getLeavesOfType(viewType);

    if (leaves.length > 0) {
      leaf = leaves[0] ?? null;
    } else {
      leaf = this.app.workspace.getRightLeaf(true);
      await leaf?.setViewState({ active: true, type: viewType });
    }

    if (leaf) {
      await this.app.workspace.revealLeaf(leaf);
    }
  }

  private registerModalCommands(): void {
    this.addCommand({
      callback: this.showSampleModal.bind(this),
      id: 'show-sample-modal',
      name: 'Show Sample Modal'
    });

    this.addCommand({
      callback: convertAsyncToSync(this.showAlert.bind(this)),
      id: 'show-alert-modal',
      name: 'Show Alert Modal'
    });

    this.addCommand({
      callback: convertAsyncToSync(this.showConfirm.bind(this)),
      id: 'show-confirm-modal',
      name: 'Show Confirm Modal'
    });

    this.addCommand({
      callback: convertAsyncToSync(this.showPrompt.bind(this)),
      id: 'show-prompt-modal',
      name: 'Show Prompt Modal'
    });

    this.addCommand({
      callback: convertAsyncToSync(this.showSelectItem.bind(this)),
      id: 'show-select-item-modal',
      name: 'Show Select Item Modal'
    });
  }

  private runSampleCommand(): void {
    new Notice('Sample command');
  }

  private runSampleCommandWithCheck(checking: boolean): boolean {
    const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (!markdownView) {
      return false;
    }

    if (!checking) {
      new Notice('Sample command with check');
    }

    return true;
  }

  private runSampleEditorCommand(editor: Editor): void {
    editor.replaceSelection('Sample Editor Command');
  }

  private runSampleRibbonIconCommand(): void {
    new Notice('Sample ribbon icon command');
  }

  private async showAlert(): Promise<void> {
    await alert({
      app: this.app,
      message: 'Sample alert message',
      title: 'Sample alert title'
    });
  }

  private async showConfirm(): Promise<void> {
    const result = await confirm({
      app: this.app,
      message: 'Sample confirm message',
      title: 'Sample confirm title'
    });

    new Notice(`Sample confirm result: ${result.toString()}`);
  }

  private async showPrompt(): Promise<void> {
    await prompt({
      app: this.app,
      defaultValue: 'Sample prompt default value',
      placeholder: 'Sample prompt placeholder',
      title: 'Sample prompt title',
      // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
      valueValidator: (value): string | void => {
        const MIN_LENGTH = 30;
        if (value.length < MIN_LENGTH) {
          return `Value must be at least ${MIN_LENGTH.toString()} characters long`;
        }
      }
    });
  }

  private showSampleModal(): void {
    new SampleModal(this.app).open();
  }

  private async showSelectItem(): Promise<void> {
    await selectItem({
      app: this.app,
      items: ['Item 1', 'Item 2', 'Item 3'],
      itemTextFunc: (item) => item,
      placeholder: 'Sample select item placeholder'
    });
  }
}
