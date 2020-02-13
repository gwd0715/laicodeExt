import axios, { AxiosRequestConfig } from "axios";
import * as vscode from "vscode";
import * as _config from "./config";
import { SRPClient, calculateSignature, getNowString } from "amazon-user-pool-srp-client";
import { EventEmitter } from "events";
import { user } from "./user";

class Login extends EventEmitter {
	private userPoolId: string;
	private clientId: string;
	private srp: SRPClient;
	private authOptions: AxiosRequestConfig;
	constructor() {
		super();
		this.userPoolId = "ZgqDM85jL";
		this.clientId = "75ggv6olvnaf0qpbm4cbmcd4t3";
		this.srp = new SRPClient(this.userPoolId);
		this.authOptions = {
			url: _config.URL.auth,
			method: "post",
			headers: _config.postHeaders,
			data: "",
			transformResponse: (data: any) => data
		};
	}
	private async call(options: AxiosRequestConfig) {
		try {
			const response = await axios(options);
			return JSON.parse(response.data);
		} catch (err) {
			return console.log(JSON.parse(err.response.data));
		}
	}
	public async login() {
		//initAuth--get chanllenge name and challenge parameters
		_config.postHeaders["X-Amz-Target"] = _config.authTarget.initAuth;
		const SRP_A = this.srp.calculateA();
		const initAuthData = {
			AuthFlow: "USER_SRP_AUTH",
			ClientId: this.clientId,
			AuthParameters: {
				USERNAME: user.getUsername(),
				SRP_A: SRP_A
			},
			ClientMetaData: {}
		};
		this.authOptions.data = JSON.stringify(initAuthData);
		const { ChallengeName, ChallengeParameters } = await this.call(this.authOptions);

		//respond to chanllenge
		const hkdf = this.srp.getPasswordAuthenticationKey(
			ChallengeParameters.USER_ID_FOR_SRP,
			user.getPassword(),
			ChallengeParameters.SRP_B,
			ChallengeParameters.SALT
		);
		const dateNow = getNowString();
		const signatureString = calculateSignature(
			hkdf,
			this.userPoolId,
			ChallengeParameters.USER_ID_FOR_SRP,
			ChallengeParameters.SECRET_BLOCK,
			dateNow
		);
		const respondData = {
			ChallengeName,
			ClientId: this.clientId,
			ChallengeResponses: {
				USERNAME: ChallengeParameters.USER_ID_FOR_SRP,
				PASSWORD_CLAIM_SECRET_BLOCK: ChallengeParameters.SECRET_BLOCK,
				TIMESTAMP: dateNow,
				PASSWORD_CLAIM_SIGNATURE: signatureString
			}
		};
		_config.postHeaders["X-Amz-Target"] = _config.authTarget.respondChallenge;
		this.authOptions.data = JSON.stringify(respondData);
		var { AuthenticationResult } = await this.call(this.authOptions);
		console.log(AuthenticationResult);
		//get IdToken
		const getTokenData = {
			ClientId: this.clientId,
			AuthFlow: "REFRESH_TOKEN_AUTH",
			AuthParameters: {
				REFRESH_TOKEN: AuthenticationResult.RefreshToken,
				DEVICE_KEY: null
			}
		};
		_config.postHeaders["X-Amz-Target"] = _config.authTarget.initAuth;
		this.authOptions.data = JSON.stringify(getTokenData);
		var { AuthenticationResult } = await this.call(this.authOptions);
		console.log(AuthenticationResult);
	}
}

export const login: Login = new Login();
