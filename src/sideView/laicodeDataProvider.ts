import * as vscode from "vscode";
import { LaicodeNode } from "./laicodeDataNode";
import { laicodeDataManager } from "./LaicodeDataManager";
import { user } from "../user";
import { defaultProblem, UserStatus, Catalog } from "../config";
export class LaicodeTreeDataProvider implements vscode.TreeDataProvider<LaicodeNode> {
	private _onDidChangeTreeData:
		| vscode.EventEmitter<LaicodeNode | null | undefined>
		| undefined = new vscode.EventEmitter<LaicodeNode | null | undefined>();
	readonly onDidChangeTreeData: vscode.Event<LaicodeNode | null | undefined> = this
		._onDidChangeTreeData!.event;

	public refresh(): void {
		this._onDidChangeTreeData!.fire();
	}

	public getTreeItem(element: LaicodeNode): vscode.TreeItem | Thenable<vscode.TreeItem> {
		// if (user.userStatus === UserStatus.LogOut) {
		// 	return {
		// 		label: "Login to Laicode App",
		// 		collapsibleState: vscode.TreeItemCollapsibleState.None,
		// 		command: {
		// 			command: "laicode.login",
		// 			title: "Login to Laicode App"
		// 		}
		// 	};
		// }

		return {
			label: element.isProblem ? `[${element.index}] ${element.title}` : element.title,
			collapsibleState:
				element.id === "greetings"
					? vscode.TreeItemCollapsibleState.None
					: element.isProblem
					? vscode.TreeItemCollapsibleState.None
					: vscode.TreeItemCollapsibleState.Collapsed,
			command:
				element.id === "greetings"
					? undefined
					: element.isProblem
					? element.previewProblem
					: undefined
		};
	}
	public getChildren(element?: LaicodeNode | undefined): vscode.ProviderResult<LaicodeNode[]> {
		// if (user.userStatus === UserStatus.LogOut) {
		// 	return [
		// 		new LaicodeNode(
		// 			Object.assign({}, defaultProblem, {
		// 				id: "not Login",
		// 				title: "NeedLogin"
		// 			}),
		// 			false
		// 		)
		// 	];
		// }
		if (!element) {
			return laicodeDataManager.getRootNodes();
		} else {
			switch (element.title) {
				case Catalog.All:
					return laicodeDataManager.getAllNodes();
				case Catalog.Plans:
					return laicodeDataManager.getPlansNode();
				case Catalog.Category:
					return laicodeDataManager.getCategoryNodes();
				case Catalog.Tag:
					return laicodeDataManager.getTagNodes();
				case Catalog.Favorite:
					return laicodeDataManager.getFavoriteNodes();
				default:
					if (element.isProblem || element.id === "greetings") {
						return [];
					}
					return laicodeDataManager.getSubCategoryNodesByElement(element);
			}
		}
	}
}

export const laicodeDataProvider: LaicodeTreeDataProvider = new LaicodeTreeDataProvider();
