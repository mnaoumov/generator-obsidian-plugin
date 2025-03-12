import type { Root } from 'react-dom/client';

import { ItemView } from 'obsidian';
import { AppContext } from 'obsidian-dev-utils/obsidian/React/AppContext';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import type { SampleReactComponentProps } from '../ReactComponents/SampleReactComponent.tsx';

import { SampleReactComponent } from '../ReactComponents/SampleReactComponent.tsx';

export const SAMPLE_REACT_VIEW_TYPE = '<%= pluginId %>-SampleReactView';

export class SampleReactView extends ItemView {
  private root: null | Root = null;

  public override getDisplayText(): string {
    return 'SampleReact view';
  }

  public override getViewType(): string {
    return SAMPLE_REACT_VIEW_TYPE;
  }

  public override async onClose(): Promise<void> {
    this.root?.unmount();
    await Promise.resolve();
  }

  public override async onOpen(): Promise<void> {
    const START_COUNT = 10;
    const props: SampleReactComponentProps = {
      startCount: START_COUNT
    };

    this.root = createRoot(this.contentEl);
    this.root.render(
      <StrictMode>
        <AppContext.Provider value={this.app}>
          <SampleReactComponent {...props} />
        </AppContext.Provider>
      </StrictMode>
    );

    await Promise.resolve();
  }
}
