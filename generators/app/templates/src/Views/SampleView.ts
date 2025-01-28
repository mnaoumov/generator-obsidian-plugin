import { ItemView } from 'obsidian';
import {
  mount,
  unmount
} from 'svelte';

import type {
  SampleComponentExports,
  SampleComponentProps
} from '../SvelteComponents/SampleComponent.svelte';

import SampleComponent from '../SvelteComponents/SampleComponent.svelte';

export const SAMPLE_VIEW_TYPE = '<%= pluginId %>-sample-view';

export class SampleView extends ItemView {
  private SampleComponent: null | SampleComponentExports = null;

  public override getDisplayText(): string {
    return 'Sample view';
  }

  public override getViewType(): string {
    return SAMPLE_VIEW_TYPE;
  }

  public override async onClose(): Promise<void> {
    if (this.SampleComponent) {
      await unmount(this.SampleComponent);
    }
  }

  public override async onOpen(): Promise<void> {
    const props: SampleComponentProps = {
      startCount: 10
    };

    this.SampleComponent = mount(SampleComponent, {
      props,
      target: this.contentEl
    });

    this.SampleComponent.increment();
    await Promise.resolve();
  }
}
