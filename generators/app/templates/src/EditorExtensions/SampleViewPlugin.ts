import type {
  DecorationSet,
  PluginSpec,
  PluginValue
} from '@codemirror/view';

import { syntaxTree } from '@codemirror/language';
import { RangeSetBuilder } from '@codemirror/state';
import {
  Decoration,
  EditorView,
  ViewPlugin,
  ViewUpdate
} from '@codemirror/view';

import { SampleWidget } from './SampleWidget.ts';

class SampleViewPlugin implements PluginValue {
  public decorations: DecorationSet;

  public constructor(view: EditorView) {
    this.decorations = this.buildDecorations(view);
  }

  public buildDecorations(view: EditorView): DecorationSet {
    const OFFSET = 2;
    const builder = new RangeSetBuilder<Decoration>();

    for (const { from, to } of view.visibleRanges) {
      syntaxTree(view.state).iterate({
        enter(node) {
          if (node.type.name.startsWith('list')) {
            const listCharFrom = node.from - OFFSET;

            builder.add(
              listCharFrom,
              listCharFrom + 1,
              Decoration.replace({
                widget: new SampleWidget()
              })
            );
          }
        },
        from,
        to
      });
    }

    return builder.finish();
  }

  public update(update: ViewUpdate): void {
    if (update.docChanged || update.viewportChanged) {
      this.decorations = this.buildDecorations(update.view);
    }
  }
}

const pluginSpec: PluginSpec<SampleViewPlugin> = {
  decorations: (value: SampleViewPlugin) => value.decorations
};

export const sampleViewPlugin = ViewPlugin.fromClass(
  SampleViewPlugin,
  pluginSpec
);
