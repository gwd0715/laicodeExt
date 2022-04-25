import { startCase, sortBy } from "lodash";
import { Disposable } from "vscode";
import { LaicodeNode } from "./laicodeDataNode";
import { defaultProblem, Catalog, Category, URL, ILaiProblem } from "../config";
import { user } from "../user";
import * as fs from "fs";
import { request } from "../request";

class LaicodeDataManager implements Disposable {
	private allPath = "/Users/Oliver/.laicodeSession/all.json";
	private tagsPath = "/Users/Oliver/.laicodeSession/tags.json";
	private plansPath = "/Users/Oliver/.laicodeSession/plans.json";
	private allProblems: LaicodeNode[] = [];
	private allTags: string[] = [];
	private allPlans: any[] = [];
	private disposables: Disposable[] = [];

	public dispose() {
		this.disposables.forEach(disposable => disposable.dispose());
		this.disposables = [];
	}

	private async getAllProblemsAndTagsAndPlansToLocal() {
		const { problems } = await request.getContent(URL.allProblems);
		const { tags } = await request.getContent(URL.tags);
		const plansResponse = await request.getContent(URL.allPlans);

		if (problems) {
			problems.forEach((problem: any, index: number) => {
				this.allProblems.push(
					new LaicodeNode(
						Object.assign({}, defaultProblem, {
							index: index + 1,
							id: problem.id,
							category: problem.category,
							difficulty: problem.difficulty,
							hasBookmark: problem.hasBookmark,
							isGroup: problem.isGroup,
							liked: problem.liked,
							sectionOrder: problem.sectionOrder,
							state: problem.state,
							tags: problem.tags,
							title: problem.title,
							totalSubmission: problem.totalSubmission
						})
					)
				);
			});
			fs.writeFileSync(this.allPath, JSON.stringify(problems));
			console.log("successful write problems fileSync");
		}

		if (tags) {
			this.allTags = tags;
			fs.writeFileSync(this.tagsPath, JSON.stringify(tags));
			console.log("successful write tags fileSync");
		}

		if (plansResponse) {
			this.allPlans = plansResponse;
			fs.writeFileSync(this.plansPath, JSON.stringify(plansResponse));
			console.log("successful write plans");
		}
	}

	private async devMode() {
		const buffer = fs.readFileSync(this.allPath);
		const temp = JSON.parse(buffer.toString());
		temp.forEach((problem, index) => {
			this.allProblems.push(
				new LaicodeNode(
					Object.assign({}, problem, {
						index: index + 1
					})
				)
			);
		});
		const buffer2 = fs.readFileSync(this.tagsPath);
		this.allTags = JSON.parse(buffer2.toString());
		const buffer3 = fs.readFileSync(this.plansPath);
		this.allPlans = JSON.parse(buffer3.toString());
		console.log("Successfully readFileSync");
	}

	public getRootNodes(): LaicodeNode[] {
		//this.getAllProblemsAndTagsAndPlansToLocal();
		// //dev mode
		this.devMode();
		return [
			new LaicodeNode(
				Object.assign({}, defaultProblem, {
					id: "greetings",
					title: "Welcome, " + user.givename
				}),
				false
			),
			new LaicodeNode(
				Object.assign({}, defaultProblem, {
					title: Catalog.All
				}),
				false
			),
			new LaicodeNode(
				Object.assign({}, defaultProblem, {
					title: Catalog.Plans
				}),
				false
			),
			new LaicodeNode(
				Object.assign({}, defaultProblem, {
					title: Catalog.Category
				}),
				false
			),
			new LaicodeNode(
				Object.assign({}, defaultProblem, {
					title: Catalog.Tag
				}),
				false
			),
			new LaicodeNode(
				Object.assign({}, defaultProblem, {
					title: Catalog.Favorite
				}),
				false
			)
		];
	}

	public getAllNodes(): LaicodeNode[] {
		return this.allProblems;
	}

	public getPlansNode(): LaicodeNode[] {
		return [
			new LaicodeNode(
				Object.assign({}, defaultProblem, {
					catalog: Catalog.Plans,
					title: "Premium"
				}),
				false
			),
			new LaicodeNode(
				Object.assign({}, defaultProblem, {
					catalog: Catalog.Plans,
					title: "Top Tech Company"
				}),
				false
			),
			new LaicodeNode(
				Object.assign({}, defaultProblem, {
					catalog: Catalog.Plans,
					title: "Essential Topics"
				}),
				false
			)
		];
	}

	public getCategoryNodes(): LaicodeNode[] {
		return [
			new LaicodeNode(
				Object.assign({}, defaultProblem, {
					catalog: Catalog.Category,
					title: Category.DS
				}),
				false
			),
			new LaicodeNode(
				Object.assign({}, defaultProblem, {
					catalog: Catalog.Category,
					title: Category.REC
				}),
				false
			),
			new LaicodeNode(
				Object.assign({}, defaultProblem, {
					catalog: Catalog.Category,
					title: Category.GRAPH
				}),
				false
			),
			new LaicodeNode(
				Object.assign({}, defaultProblem, {
					catalog: Catalog.Category,
					title: Category.DP
				}),
				false
			),
			new LaicodeNode(
				Object.assign({}, defaultProblem, {
					catalog: Catalog.Category,
					title: Category.PRB
				}),
				false
			),
			new LaicodeNode(
				Object.assign({}, defaultProblem, {
					catalog: Catalog.Category,
					title: Category.STR
				}),
				false
			),
			new LaicodeNode(
				Object.assign({}, defaultProblem, {
					catalog: Catalog.Category,
					title: Category.OTHER
				}),
				false
			)
		];
	}

	public getTagNodes(): LaicodeNode[] {
		const allTagsNode: LaicodeNode[] = [];
		this.allTags.forEach(tag => {
			allTagsNode.push(
				new LaicodeNode(
					Object.assign({}, defaultProblem, {
						catalog: Catalog.Tag,
						title: startCase(tag)
					}),
					false
				)
			);
		});
		return sortBy(allTagsNode, ["title"]);
	}

	public getFavoriteNodes(): LaicodeNode[] {
		return this.allProblems.filter(problem => problem.liked === true);
	}

	public async getSubCategoryNodesByElement(element: LaicodeNode): Promise<LaicodeNode[]> {
		if (element.catalog === Catalog.Category) {
			let key = Object.keys(Category).find(x => Category[x] === element.title);
			if (key === "OTHER") {
				key = "NONE";
			}
			return this.allProblems.filter(x => x.category === key);
		}
		if (element.catalog === Catalog.Tag) {
			return this.allProblems.filter(x =>
				x.tags.split(",").find(s => startCase(s) === element.title)
			);
		}
		if (element.catalog === Catalog.Plans) {
			let res: LaicodeNode[] = [];
			var title = element.title;
			if (element.title === "Top Tech Company") {
				title = "Interview questions from top tech companies";
			}
			let plans = this.allPlans.filter(x => x.category === title);
			plans.forEach(x =>
				res.push(
					new LaicodeNode(
						Object.assign({}, defaultProblem, {
							id: x.id,
							catalog: "singlePlan",
							title: x.name
						}),
						false
					)
				)
			);
			return res;
		}
		if (element.catalog === "singlePlan") {
			try {
				var planProblems: LaicodeNode[] = [];
				const res: LaicodeNode[] = await this.getSinglePlanProblems(element);
				res.forEach(problem => {
					planProblems.push(this.allProblems.find(p => p.id === problem.id)!);
				});
				return sortBy(planProblems, ["id"]);
			} catch (error) {
				return Promise.reject(error);
			}
		}
		return [];
	}

	private async getSinglePlanProblems(element: LaicodeNode): Promise<LaicodeNode[]> {
		const url = URL.allPlans + "/" + element.id;
		var result: LaicodeNode[] = [];
		const { problems } = await request.getContent(url);
		if (problems) {
			problems.forEach((problem: any, index: number) => {
				result.push(
					new LaicodeNode(
						Object.assign({}, defaultProblem, {
							id: problem.id
						})
					)
				);
				return result;
			});
		}
		return result;
	}

	public getSingleProblemDescription(element: ILaiProblem): LaicodeNode | undefined {
		return this.allProblems[0];
	}
}

export const laicodeDataManager: LaicodeDataManager = new LaicodeDataManager();
