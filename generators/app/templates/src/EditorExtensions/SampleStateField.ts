import type { Extension } from '@codemirror/state';
import type { DecorationSet } from '@codemirror/view';
import type { StateFieldSpec } from 'obsidian-dev-utils/codemirror/StateFieldSpec';

import { syntaxTree } from '@codemirror/language';
import {
  RangeSetBuilder,
  StateField,
  Transaction
} from '@codemirror/state';
import {
  Decoration,
  EditorView
} from '@codemirror/view';

import { SampleWidget } from './SampleWidget.ts';

class SampleStateField implements StateFieldSpec<DecorationSet> {
  public create(): DecorationSet {
    return Decoration.none;
  }

  public provide(field: StateField<DecorationSet>): Extension {
    return EditorView.decorations.from(field);
  }

  public update(_oldState: DecorationSet, transaction: Transaction): DecorationSet {
    const OFFSET = 2;
    const builder = new RangeSetBuilder<Decoration>();

    syntaxTree(transaction.state).iterate({
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
      }
    });

    return builder.finish();
  }
}

export const sampleStateField = StateField.define<DecorationSet>(new SampleStateField());
