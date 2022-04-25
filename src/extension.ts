// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { login } from "./login";
import { user } from "./user";
import { laicodeDataProvider } from "./sideView/laicodeDataProvider";
import { laicodeDataManager } from "./sideView/laicodeDataManager";
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "laicodex" is now active!');
	user.initializeUser();
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
	// 	vscode.window.showInformationMessage('Hello World!');
	// });

	context.subscriptions.push(
		laicodeDataManager,
		vscode.window.createTreeView("laicodeExplorer", {
			treeDataProvider: laicodeDataProvider,
			showCollapseAll: true
		}),
		vscode.commands.registerCommand("laicode.login", () => login.login())
	);
}

// this method is called when your extension is deactivated
export function deactivate() {}
