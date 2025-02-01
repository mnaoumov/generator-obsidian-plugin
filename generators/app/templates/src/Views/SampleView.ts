import { ItemView } from 'obsidian';
import {
  mount,
  unmount
} from 'svelte';

import type {
  SampleComponentExports,
  SampleComponentProps
} from '../SvelteComponents/SampleComponent.d.ts';

import SampleComponent from '../SvelteComponents/SampleComponent.svelte';

export const SAMPLE_VIEW_TYPE = '<%= pluginId %>-sample-view';

export class SampleView extends ItemView {
  private sampleComponent: null | SampleComponentExports = null;

  public override getDisplayText(): string {
    return 'Sample view';
  }

  public override getViewType(): string {
    return SAMPLE_VIEW_TYPE;
  }

  public override async onClose(): Promise<void> {
    if (this.sampleComponent) {
      await unmount(this.sampleComponent);
    }
  }

  public override async onOpen(): Promise<void> {
    const START_COUNT = 10;
    const props: SampleComponentProps = {
      startCount: START_COUNT
    };

    this.sampleComponent = mount(SampleComponent, {
      props,
      target: this.contentEl
    }) as SampleComponentExports;

    this.sampleComponent.increment();
    await Promise.resolve();
  }
}
