import { ItemView } from 'obsidian';
import { StrictMode } from 'react';
import {
  createRoot,
  type Root
} from 'react-dom/client';
import { AppContext } from '../ReactComponents/AppContext.ts';
import {
  SampleReactComponent,
  type SampleReactComponentProps
} from '../ReactComponents/SampleReactComponent.tsx';

export const SAMPLE_REACT_VIEW_TYPE = '<%= pluginId %>-SampleReactView';

export class SampleReactView extends ItemView {
  private root: Root | null = null;

  public override getViewType(): string {
    return SAMPLE_REACT_VIEW_TYPE;
  }

  public override getDisplayText(): string {
    return 'SampleReact view';
  }

  public override async onOpen() {
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
  }

  public override async onClose() {
    this.root?.unmount();
  }
}
