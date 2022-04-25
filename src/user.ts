import * as vscode from "vscode";
import { UserStatus, IUserProfile, URL } from "./config";
import { session } from "./session";
import { login } from "./login";
import { laicodeDataManager } from "./sideView/laicodeDataManager";
import { laicodeDataProvider } from "./sideView/laicodeDataProvider";

export class User {
	private _userProfile: IUserProfile = session.getSession();
	private _username: string = this._userProfile.username;
	private _givenname: string = "chris";
	private _password: string = this._userProfile.password;
	private _userId: string = this._userProfile.userId;
	private _userStatus: UserStatus = UserStatus.LogOut;

	public async initializeUser() {
		if (this._userProfile.session.IdToken === "") {
			vscode.window.showInformationMessage("No login information. Please login!");
			login.login();
		} else {
			vscode.window.showInformationMessage("Login token detected. Login by token...");
			// this._userStatus = await session.checkSession();
			// if (this._userStatus === UserStatus.Login) {
			// 	vscode.window.showInformationMessage("Valid token. Login successful");
			// 	laicodeDataProvider.refresh();
			// } else {
			// 	vscode.window.showInformationMessage("Invalid token. Login by password...");
			// 	login.login();
			// }
		}
	}

	public refreshUserInfo() {
		this._userProfile = session.getSession();
		this._username = this._userProfile.username;
		this._password = this._userProfile.password;
		this._userId = this._userProfile.userId;
	}

	public get userStatus() {
		return this._userStatus;
	}

	public set userStatus(status: UserStatus) {
		this._userStatus = status;
	}
	public get username() {
		return this._username;
	}

	public get password() {
		return this._password;
	}

	public get userProfile() {
		return this._userProfile;
	}

	public get userId() {
		return this._userId;
	}

	public get givename() {
		return this._givenname;
	}

	public set givename(name: string) {
		this._givenname = name;
	}
}

export const user: User = new User();
