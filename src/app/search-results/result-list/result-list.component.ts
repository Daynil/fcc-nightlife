import { Component, OnInit } from '@angular/core';

import { ResultListService } from './result-list.service';
import { ResultComponent } from '../result/result.component';
import { Result } from '../../shared/results.model';

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

	constructor(private resultListService: ResultListService) { }

	ngOnInit() { }

	search(location: string) {
		if (location.length < 1) return;
		this.resultListService.searchlocation(location)
			.then( res => {
				this.results = res;
			});
	}

}