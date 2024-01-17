import { Plugin } from "obsidian";

export default class <%= pluginClassName %> extends Plugin {
  public onload(): void {
    this.app.workspace.onLayoutReady(this.onLayoutReady.bind(this));
  }

  private onLayoutReady(): void {
  }
}
