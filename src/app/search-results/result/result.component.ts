import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Result } from '../../shared/result.model';

@Component({
	moduleId: module.id,
	selector: 'result',
	templateUrl: 'result.component.html',
	styleUrls: ['result.component.css']
})
export class ResultComponent implements OnInit {
  @Input() result: Result;
	@Output() onAttend: EventEmitter<Result> = new EventEmitter<Result>();

	stars: number[] = [];
	halfStar: boolean;
	going = 0;

	constructor() { }

	ngOnInit() {
		let numStars = Math.floor(this.result.rating);
		for (let i = 0; i < numStars; i++) {
			this.stars.push(i);
		}
		this.halfStar = Math.floor(this.result.rating) !== this.result.rating;
	}

	attend() {
		this.onAttend.emit(this.result);
	}

}