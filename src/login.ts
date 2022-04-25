import * as vscode from "vscode";
import { authTarget, UserStatus, IUserProfile, URL } from "./config";
import { SRPClient, calculateSignature, getNowString } from "amazon-user-pool-srp-client";
import { EventEmitter } from "events";
import { user } from "./user";
import { session } from "./session";
import { post } from "./post";

class Login extends EventEmitter {
	private _userPoolId: string = "ZgqDM85jL";
	private _clientId: string = "75ggv6olvnaf0qpbm4cbmcd4t3";
	private _srp: SRPClient = new SRPClient(this._userPoolId);
	private _username: string | undefined;
	private _password: string | undefined;

	constructor() {
		super();
	}

	public async login(): Promise<void> {
		try {
			if (user.username === "") {
				const userInfo: string | undefined = await this.inputUserNameAndPwd();
				if (!userInfo) {
					return;
				}
			} else {
				this._username = user.username;
				this._password = user.password;
			}
			//initAuth--get chanllenge name and challenge parameters
			post.postHeaders["X-Amz-Target"] = authTarget.initAuth;
			const SRP_A = this._srp.calculateA();
			const initAuthData = {
				AuthFlow: "USER_SRP_AUTH",
				ClientId: this._clientId,
				AuthParameters: {
					USERNAME: this._username,
					SRP_A: SRP_A
				},
				ClientMetaData: {}
			};
			const { ChallengeName, ChallengeParameters } = await post.post(URL.auth, initAuthData);
			if (!ChallengeName) {
				vscode.window.showErrorMessage("User does not exist");
				return;
			}

			//respond to chanllenge
			const hkdf = this._srp.getPasswordAuthenticationKey(
				ChallengeParameters.USER_ID_FOR_SRP,
				this._password,
				ChallengeParameters.SRP_B,
				ChallengeParameters.SALT
			);
			const dateNow: string = getNowString();
			const signatureString: string = calculateSignature(
				hkdf,
				this._userPoolId,
				ChallengeParameters.USER_ID_FOR_SRP,
				ChallengeParameters.SECRET_BLOCK,
				dateNow
			);
			const respondData = {
				ChallengeName,
				ClientId: this._clientId,
				ChallengeResponses: {
					USERNAME: ChallengeParameters.USER_ID_FOR_SRP,
					PASSWORD_CLAIM_SECRET_BLOCK: ChallengeParameters.SECRET_BLOCK,
					TIMESTAMP: dateNow,
					PASSWORD_CLAIM_SIGNATURE: signatureString
				}
			};
			post.postHeaders["X-Amz-Target"] = authTarget.respondChallenge;
			var { AuthenticationResult } = await post.post(URL.auth, respondData);
			if (!AuthenticationResult) {
				vscode.window.showErrorMessage("Wrong Password");
				return;
			}

			//get IdToken
			const getTokenData = {
				ClientId: this._clientId,
				AuthFlow: "REFRESH_TOKEN_AUTH",
				AuthParameters: {
					REFRESH_TOKEN: AuthenticationResult.RefreshToken,
					DEVICE_KEY: null
				}
			};
			post.postHeaders["X-Amz-Target"] = authTarget.initAuth;
			var { AuthenticationResult } = await post.post(URL.auth, getTokenData);
			user.userStatus = UserStatus.Login;
			vscode.window.showInformationMessage("Login Success");

			//save user profile with session to local
			const userprofile: IUserProfile = {
				userId: ChallengeParameters.USER_ID_FOR_SRP,
				username: this._username!,
				password: this._password!,
				session: AuthenticationResult
			};
			session.setSession(JSON.stringify(userprofile));

			//refresh user instance
			user.refreshUserInfo();

			//check session and get givenname
			session.checkSession();
		} catch (error) {
			console.log(error);
		}
	}

	private async inputUserNameAndPwd() {
		//get username and password
		this._username = await vscode.window.showInputBox({
			prompt: "Enter username or E-mail.",
			ignoreFocusOut: true,
			validateInput: (s: string): string | undefined =>
				s && s.trim() ? undefined : "The input must not be empty"
		});
		if (!this._username) {
			return Promise.resolve(undefined);
		}
		this._password = await vscode.window.showInputBox({
			prompt: "Enter password.",
			password: true,
			ignoreFocusOut: true,
			validateInput: (s: string): string | undefined =>
				s ? undefined : "Password must not be empty"
		});
		if (!this._password) {
			return Promise.resolve(undefined);
		}
		return Promise.resolve(this._username);
	}

	public get authOptions() {
		return post.postOptions;
	}
}

export const login: Login = new Login();
