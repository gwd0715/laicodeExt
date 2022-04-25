import * as vscode from "vscode";

export abstract class LaicodeWebView implements vscode.Disposable {
	protected panel: vscode.WebviewPanel | undefined;
	public dispose() {
		if (this.panel) {
			this.panel.dispose();
		}
	}

	protected abstract getWebContents(): string;
}
