class User {
	private USERNAME: string;
	private PASSWORD: string;
	private IdToken: string;

	constructor() {
		this.USERNAME = "gwd0715@gmail.com";
		this.PASSWORD = "fistic-zoshy7-bAmbuf";
		this.IdToken = "";
	}

	public getUsername() {
		return this.USERNAME;
	}

	public getPassword() {
		return this.PASSWORD;
	}

	public getIdToken() {
		return this.IdToken;
	}

	public setIdToken(idToken: string) {
		this.IdToken = idToken;
	}
}

export const user: User = new User();
