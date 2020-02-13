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
	user: "ff6a83f60c215ea23fdc10763c27bf79",
	origin: "https://app.laicode.io",
	referer: "https://app.laicode.io/",
	"sec-fetch-dest": "empty",
	"sec-fetch-mode": "cors",
	"sec-fetch-site": "cross-site",
	"user-agent":
		"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36"
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
