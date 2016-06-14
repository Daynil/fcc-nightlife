import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../auth.service';
import { ResultListService } from './result-list.service';
import { ResultComponent } from '../result/result.component';
import { Result } from '../../shared/result.model';
import { User, Credentials } from '../../user.model';

@Component({
	moduleId: module.id,
	selector: 'result-list',
	templateUrl: 'result-list.component.html',
	styleUrls: ['result-list.component.css'],
	directives: [ResultComponent],
	providers: [ResultListService]
})
export class ResultListComponent implements OnInit {
	results: Result[];
	credentials: Credentials = {loggedIn: false, user: null};

	constructor( private resultListService: ResultListService,
							 private authService: AuthService ) {
		
	}

	ngOnInit() {
		this.checkLoggedState().then( res => this.credentials = res );
	}

	checkLoggedState() {
		return this.authService.checkLoggedState();
	}

	search(location: string) {
		if (location.length < 1) return;
		this.resultListService.searchlocation(location)
			.then( res => {
				this.results = res;
			});
	}

	attend(result: Result) {
		if (this.credentials.loggedIn) console.log('already logged, attend success!');
		else {
			this.authService
					.handleAuthLogging()
					.then(this.checkLoggedState.bind(this))
					.then((creds: Credentials) => {
						this.credentials = creds;
						if (this.credentials.loggedIn) {
							console.log('logged in and voted same time!');
						}
					})
					.catch(err => console.log(err));
		}
	}

}