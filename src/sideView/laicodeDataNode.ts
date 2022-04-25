import { ILaiProblem } from "../config";
import { Command } from "vscode";

export class LaicodeNode {
	constructor(private data: ILaiProblem, private isProblemNode: boolean = true) {}

	public get isProblem(): boolean {
		return this.isProblemNode;
	}

	public get index(): number {
		return this.data.index;
	}

	public get catalog(): string {
		return this.data.catalog;
	}

	public get category(): string {
		return this.data.category;
	}

	public get difficulty(): string {
		return this.data.difficulty;
	}

	public get hasBookmark(): boolean {
		return this.data.hasBookmark;
	}

	public get id(): string {
		return this.data.id;
	}

	public get isGroup(): boolean {
		return this.data.isGroup;
	}

	public get liked(): boolean {
		return this.data.liked;
	}

	public get sectionOrder(): number {
		return this.data.sectionOrder;
	}

	public get state(): number {
		return this.data.state;
	}

	public get tags(): string {
		return this.data.tags;
	}

	public get title(): string {
		return this.data.title;
	}

	public get totalSubmission(): number {
		return this.data.totalSubmission;
	}

	public get previewProblem(): Command {
		return {
			title: "Preview Problem",
			command: "laicode.previewProblem",
			arguments: [this]
		};
	}
}
