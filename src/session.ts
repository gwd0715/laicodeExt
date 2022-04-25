import * as fs from "fs";
import * as path from "path";
import { window } from "vscode";
import { authTarget, defaultUserProfile, IUserProfile, URL, UserStatus } from "./config";
import { post } from "./post";
import { user } from "./user";

class Session {
	private userHomeDir: string = (process.env.HOME || process.env.USERPROFILE)!;
	private homeDir: string = path.join(this.userHomeDir, ".laicodeSession");
	private sessionFileDir: string = path.join(this.homeDir, "user.json");

	constructor() {
		if (!fs.existsSync(this.sessionFileDir)) {
			fs.writeFileSync(this.sessionFileDir, JSON.stringify(defaultUserProfile));
		}
	}

	public getSession(): IUserProfile {
		try {
			const buffer = fs.readFileSync(this.sessionFileDir, "utf8");
			return JSON.parse(buffer.toString());
		} catch (error) {
			window.showErrorMessage("Reading Session File failed");
			console.log(error);
		}

		return defaultUserProfile;
	}

	public setSession(data: string): void {
		try {
			fs.writeFileSync(this.sessionFileDir, data);
			console.log("Successfully saved user profile with session");
		} catch (err) {
			window.showErrorMessage("Writing Session File failed");
			console.log(err);
		}
	}

	public async checkSession(): Promise<UserStatus> {
		post.postHeaders["X-Amz-Target"] = authTarget.getUser;
		const getUserInfoData = {
			AccessToken: user.userProfile.session.AccessToken
		};
		var { UserAttributes, Username } = await post.post(URL.auth, getUserInfoData);
		if (Username) {
			const givennameItem = UserAttributes.find((item: any) => item.Name === "given_name");
			user.givename = givennameItem.Value;
			return UserStatus.Login;
		}
		return UserStatus.LogOut;
	}
}

export const session: Session = new Session();
