import axios, { AxiosRequestConfig } from "axios";
import { URL, postHeaders, postOptions } from "./config";
import * as vscode from "vscode";

class Post {
	private _postHeaders = postHeaders;
	private _postOptions = postOptions;

	public async post(url: string, data: Object): Promise<any> {
		if (!data) {
			vscode.window.showErrorMessage("Wrong Internet post method.");
			return Promise.reject();
		}
		try {
			this._postOptions.url = url;
			this._postOptions.data = data;
			this._postOptions.headers = this._postHeaders;
			const response = await axios(this._postOptions);
			if (typeof response.data === "string") {
				return JSON.parse(response.data);
			}
			return response.data;
		} catch (err) {
			if (typeof err.response.data === "string") {
				return JSON.parse(err.response.data);
			}
			return err.response.data;
		}
	}

	public get postHeaders() {
		return this._postHeaders;
	}

	public get postOptions() {
		return this._postOptions;
	}
}

export const post: Post = new Post();
