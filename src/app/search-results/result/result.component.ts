import { Component, Input, OnInit } from '@angular/core';

import { Result } from '../../shared/results.model';

@Component({
	moduleId: module.id,
	selector: 'result',
	templateUrl: 'result.component.html',
	styleUrls: ['result.component.css']
})
export class ResultComponent implements OnInit {
  @Input() result: Result;

	constructor() { }

	ngOnInit() { }

}