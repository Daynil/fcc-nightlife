import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../shared/auth.service';
import { ResultListService } from './result-list.service';
import { ResultComponent } from '../result/result.component';
import { Result } from '../../shared/result.model';
import { User, Credentials } from '../../shared/user.model';

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

	loading = false;

	constructor( private resultListService: ResultListService,
							 private authService: AuthService ) { }

	ngOnInit() {
		this.checkLoggedState().then( res => this.credentials = res );
	}

	checkLoggedState() {
		return this.authService.checkLoggedState();
	}

	search(location: string) {
		if (location.length < 1) return;
		this.loading = true;
		this.resultListService.searchlocation(location)
			.then( (res: Result[]) => {
				this.results = res;
				this.loading = false;
			});
	}

	attend(result: Result) {
		let resultIndex = this.results.indexOf(result);
		if (this.credentials.loggedIn) {
			this.resultListService
					.changeAttendance(result.url, this.credentials.user.twitterID)
					.then(amountOfVenueAttendees => {
						this.results[resultIndex].numAttendees = amountOfVenueAttendees.numAttendees;
					});
		}
		else {
			this.authService
					.handleAuthLogging()
					.then(this.checkLoggedState.bind(this))
					.then((creds: Credentials) => {
						this.credentials = creds;
						if (this.credentials.loggedIn) {
							this.resultListService
									.changeAttendance(result.url, this.credentials.user.twitterID)
									.then(amountOfVenueAttendees => {
										this.results[resultIndex].numAttendees = amountOfVenueAttendees.numAttendees;
									});
						}
					})
					.catch(err => console.log(err));
		}
	}

}