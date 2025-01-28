import type {
  EditorState,
  Extension
} from '@codemirror/state';
import type { DecorationSet } from '@codemirror/view';

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

interface StateFieldSpec<Value> {
  compare?: (a: Value, b: Value) => boolean;
  create: (state: EditorState) => Value;
  fromJSON?: (json: unknown, state: EditorState) => Value;
  provide?: (field: StateField<Value>) => Extension;
  toJSON?: (value: Value, state: EditorState) => unknown;
  update: (value: Value, transaction: Transaction) => Value;
}

class SampleStateField implements StateFieldSpec<DecorationSet> {
  public create(): DecorationSet {
    return Decoration.none;
  }

  public provide(field: StateField<DecorationSet>): Extension {
    return EditorView.decorations.from(field);
  }

  public update(_oldState: DecorationSet, transaction: Transaction): DecorationSet {
    const builder = new RangeSetBuilder<Decoration>();

    syntaxTree(transaction.state).iterate({
      enter(node) {
        if (node.type.name.startsWith('list')) {
          const listCharFrom = node.from - 2;

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
