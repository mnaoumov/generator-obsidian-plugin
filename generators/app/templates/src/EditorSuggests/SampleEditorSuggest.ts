import type {
  Editor,
  EditorPosition,
  EditorSuggestContext,
  EditorSuggestTriggerInfo,
  TFile
} from 'obsidian';

import { EditorSuggest } from 'obsidian';

export class SampleEditorSuggest extends EditorSuggest<string> {
  private cursor: EditorPosition | null = null;
  private editor: Editor | null = null;

  public override getSuggestions(context: EditorSuggestContext): Promise<string[]> | string[] {
    return [`${context.query} 1`, `${context.query} 2`, `${context.query} 3`];
  }

  public override onTrigger(cursor: EditorPosition, editor: Editor, file: null | TFile): EditorSuggestTriggerInfo | null {
    this.cursor = cursor;
    this.editor = editor;
    const line = editor.getLine(cursor.line);
    if (line !== 'Sample') {
      return null;
    }

    return {
      end: cursor,
      query: `Query ${file?.name ?? ''}`,
      start: cursor
    };
  }

  public override renderSuggestion(value: string, el: HTMLElement): void {
    el.createEl('strong', { text: value });
  }

  public override selectSuggestion(value: string, evt: KeyboardEvent | MouseEvent): void {
    this.close();
    if (this.editor && this.cursor) {
      this.editor.replaceRange(`Transformed ${value} ${evt.type}`, this.cursor);
    }
  }
}
