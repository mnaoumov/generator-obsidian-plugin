import { Modal } from 'obsidian';

export class SampleModal extends Modal {
  public override onOpen(): void {
    this.contentEl.setText('Sample Modal');
  }
}
