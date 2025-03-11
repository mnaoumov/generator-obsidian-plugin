import { ItemView } from 'obsidian';
import {
  mount,
  unmount
} from 'svelte';

import type {
  SampleSvelteComponentExports,
  SampleSvelteComponentProps
} from '../SvelteComponents/SampleSvelteComponent.d.ts';

import SampleSvelteComponent from '../SvelteComponents/SampleSvelteComponent.svelte';

export const SAMPLE_SVELTE_VIEW_TYPE = '<%= pluginId %>-SampleSvelteView';

export class SampleSvelteView extends ItemView {
  private sampleSvelteComponent: null | SampleSvelteComponentExports = null;

  public override getDisplayText(): string {
    return 'SampleSvelte view';
  }

  public override getViewType(): string {
    return SAMPLE_SVELTE_VIEW_TYPE;
  }

  public override async onClose(): Promise<void> {
    if (this.sampleSvelteComponent) {
      await unmount(this.sampleSvelteComponent);
    }
  }

  public override async onOpen(): Promise<void> {
    const START_COUNT = 10;
    const props: SampleSvelteComponentProps = {
      startCount: START_COUNT
    };

    this.sampleSvelteComponent = mount(SampleSvelteComponent, {
      props,
      target: this.contentEl
    }) as SampleSvelteComponentExports;

    this.sampleSvelteComponent.increment();
    await Promise.resolve();
  }
}
