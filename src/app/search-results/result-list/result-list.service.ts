import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import "rxjs/add/operator/toPromise";

import { parseJson, handleError } from '../../shared/http-helpers';
import { Result } from '../../shared/result.model';

@Injectable()
export class ResultListService {

  constructor(private http: Http) { }

  searchlocation(location: string) {
    return this.http
                .get(`/searchlocation/${location}`)
                .toPromise()
                .then(parseJson)
                .then(this.formatResponse)
                .catch(handleError);
  }

  formatResponse(data): Result[] {
    let businesses = <Array<any>>data.businesses;
    let formattedRes: Result[] = [];
    businesses.forEach(business => {
      formattedRes.push({
        name: business.name,
        imageUrl: business.image_url,
        rating: business.rating,
        reviewCount: business.review_count,
        url: business.url,
        snippetText: business.snippet_text
      });
    });
    return formattedRes;
  }

}