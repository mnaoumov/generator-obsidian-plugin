import { WidgetType } from '@codemirror/view';

export class SampleWidget extends WidgetType {
  public toDOM(): HTMLElement {
    return createEl('span', { text: '👉' });
  }
}
