import { AxiosRequestConfig } from "axios";

export const URL = {
	auth: "https://cognito-idp.us-west-2.amazonaws.com/",
	getId: "https://cognito-identity.us-west-2.amazonaws.com/",
	profile: "https://api.laioffer.com/laicode/api/profile",
	allProblems: "https://api.laioffer.com/laicode/api/trainings/plans/all",
	allPlans: "https://api.laioffer.com/laicode/api/trainings/plans",
	myPlans: "https://api.laioffer.com/laicode/api/trainings/plans/myplans",
	bookmarkList: "https://api.laioffer.com/laicode/api/bookmarklist/all_lists/0",
	trending: "https://api.laioffer.com/laicode/api/trending",
	problemDescriptions: "https://api.laioffer.com/laicode/api/problem/?",
	problemMeta: "https://api.laioffer.com/laicode/api/problem/?/meta",
	runcode: "https://api.laioffer.com/laicode/api/submission/runcode/save/?",
	checkRuncode: "https://api.laioffer.com/laicode/api/submission/runcode/?",
	submission: "https://api.laioffer.com/laicode/api/submission/store/?",
	checkSubmission: "https://api.laioffer.com/laicode/api/submission/?",
	tags: "https://api.laioffer.com/laicode/api/search/problem/tags"
};

export var getHeaders = {
	accept: "application/json",
	authorization: "",
	"content-type": "application/json; charset=utf-8",
	email: "",
	user: "",
	origin: "https://app.laicode.io",
	referer: "https://app.laicode.io/",
	"sec-fetch-dest": "empty",
	"sec-fetch-mode": "cors",
	"sec-fetch-site": "cross-site",
	"user-agent":
		"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36"
};
export var postOptions: AxiosRequestConfig = {
	url: "",
	method: "post",
	headers: {},
	data: {},
	transformResponse: (data: any) => data
};

export var postHeaders = {
	"Content-Type": "application/x-amz-json-1.1",
	"X-Amz-Target": "",
	"Sec-Fetch-Mode": "cors",
	"X-Amz-User-Agent": "aws-amplify/0.1.x js",
	"User-Agent":
		"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36"
};

export const authTarget = {
	initAuth: "AWSCognitoIdentityProviderService.InitiateAuth",
	respondChallenge: "AWSCognitoIdentityProviderService.RespondToAuthChallenge",
	getId: "AWSCognitoIdentityService.GetId",
	getCredentials: "AWSCognitoIdentityService.GetCredentialsForIdentity",
	getUser: "AWSCognitoIdentityProviderService.GetUser"
};

export interface ILaiProblem {
	index: number;
	catalog: string;
	category: string;
	difficulty: string;
	hasBookmark: boolean;
	id: string;
	isGroup: boolean;
	liked: boolean;
	sectionOrder: number;
	state: number;
	tags: string;
	title: string;
	totalSubmission: number;
}

export interface ILaiProblemDesc {
	description: string;
	difficulty: string;
	id: number;
	language: [string];
	likeCount: number;
	liked: boolean;
	passSubmission: number;
	totalSubmission: number;
	tags: string;
	testCase: string;
	title: string;
}

export interface IAuthResult {
	AccessToken: string;
	ExpiresIn: number;
	IdToken: string;
	TokenType: string;
}

export interface IUserProfile {
	userId: string;
	username: string;
	password: string;
	session: IAuthResult;
}

export enum UserStatus {
	Login = 1,
	LogOut = 2
}

export enum Catalog {
	All = "All",
	Plans = "Plans",
	Category = "Category",
	Tag = "Tag",
	Favorite = "Favorite"
}

export enum Category {
	DS = "Data Structure",
	REC = "Recursion",
	GRAPH = "Graph",
	DP = "Dynamic Programming",
	PRB = "Probability",
	STR = "String",
	OTHER = "Other"
}

export const defaultProblem: ILaiProblem = {
	index: 0,
	catalog: "",
	category: "",
	difficulty: "",
	hasBookmark: false,
	id: "",
	isGroup: false,
	liked: false,
	sectionOrder: 0,
	state: -1,
	tags: "",
	title: "",
	totalSubmission: -1
};

export const defaultAuthResult: IAuthResult = {
	AccessToken: "",
	ExpiresIn: 0,
	IdToken: "",
	TokenType: ""
};

export const defaultUserProfile: IUserProfile = {
	userId: "",
	username: "",
	password: "",
	session: defaultAuthResult
};

export const defaultProblemDesc: ILaiProblemDesc = {
	description: "",
	difficulty: "",
	id: -1,
	language: [""],
	likeCount: 0,
	liked: false,
	passSubmission: 0,
	totalSubmission: -1,
	tags: "",
	testCase: "",
	title: ""
};
