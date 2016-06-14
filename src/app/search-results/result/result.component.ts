import { Component, Input, OnInit } from '@angular/core';

import { Result } from '../../shared/result.model';

@Component({
	moduleId: module.id,
	selector: 'result',
	templateUrl: 'result.component.html',
	styleUrls: ['result.component.css']
})
export class ResultComponent implements OnInit {
  @Input() result: Result;
	stars: number[] = [];
	halfStar: boolean;

	constructor() { }

	ngOnInit() {
		let numStars = Math.floor(this.result.rating);
		for (let i = 0; i < numStars; i++) {
			this.stars.push(i);
		}
		this.halfStar = Math.floor(this.result.rating) !== this.result.rating;
	}

}