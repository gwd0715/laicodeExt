import axios, { AxiosRequestConfig } from "axios";
import { user } from "./user";
import { window } from "vscode";
import { getHeaders } from "./config";
class Request {
	private options: AxiosRequestConfig = {
		url: "",
		method: "GET",
		headers: getHeaders
	};

	//
	public async getContent(url: string): Promise<any> {
		getHeaders.authorization = user.userProfile.session.IdToken;
		getHeaders.email = user.username;
		getHeaders.user = user.userId;
		this.options.url = url;
		try {
			const response = await axios(this.options);
			if (typeof response.data === "string") {
				return JSON.parse(response.data);
			}
			return response.data;
		} catch (error) {
			window.showErrorMessage("Error retrieving data");
			console.error(error);
			return Promise.reject(error);
		}
	}
}

export const request: Request = new Request();
