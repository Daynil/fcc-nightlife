import { Injectable, EventEmitter } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/toPromise";

import { User, Credentials } from "./user.model";
import { handleError, parseJson } from './shared/http-helpers';

@Injectable()
export class AuthService {
	
	creds: Credentials = null;
	loginEvent: EventEmitter<Credentials> = new EventEmitter<Credentials>();;
	
	constructor (private http: Http) { }
	
	checkLoggedState(): Promise<Credentials> {
		return new Promise((resolve, reject) => {
			if (this.creds) {
				resolve(this.creds);
			}
			else this.refreshLoggedState().then(res => {
				resolve(this.creds);				
			});
		});
		
	}
	
	private refreshLoggedState() {
		return this.http
					.get('/auth/checkCreds')
					.toPromise()
					.then(parseJson)
					.then(res => {
						this.creds = res;
						this.loginEvent.emit(this.creds);
						return this.creds;
					})
					.catch(handleError);
	}
	
	handleAuthLogging(): Promise<any> {
		return new Promise((resolve, reject) => {
			this.refreshLoggedState().then(res => {
				if (!res.loggedIn) {
					let oauthWindow = window.open('http://127.0.0.1:3000/auth/twitter',
												'OAuthConnect',
												'location=0,status=0,width=800,height=400');
					let oauthInterval = window.setInterval(() => {
						if (oauthWindow.closed) {
							window.clearInterval(oauthInterval);
							this.refreshLoggedState().then(resolve);
						}
					}, 1000);
				} else {
/*					this.http.get('/auth/logout').subscribe(res => {
						this.refreshLoggedState().then(resolve);
					});*/
				}
			});
		});
	}
}