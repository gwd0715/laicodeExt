import { ILaiProblem } from "../config";
import { laicodeDataManager } from "../sideView/laicodeDataManager";

export async function showPreviewProblem(input: ILaiProblem) {
	let problem: ILaiProblem;
	problem = input;
	const desc = await laicodeDataManager.getSingleProblemDescription(input);
}

export function showProblem(input: ILaiProblem) {}
