import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import "rxjs/add/operator/toPromise";

import { parseJson, handleError } from '../../shared/http-helpers';
import { Result } from '../../shared/result.model';

@Injectable()
export class ResultListService {

  constructor(private http: Http) { }

  searchlocation(location: string) {
    return this.http
                .get(`/api/searchlocation/${location}`)
                .toPromise()
                .then(parseJson)
                .then(this.formatResponse)
                .then(this.mergeWithDatabaseInfo.bind(this))
                .catch(handleError);
  }

  private formatResponse(data): Result[] {
    let businesses = <Array<any>>data.businesses;
    let formattedRes: Result[] = [];
  
    businesses.forEach(business => {
      formattedRes.push({
        name: business.name,
        imageUrl: business.image_url,
        rating: business.rating,
        reviewCount: business.review_count,
        url: business.url,
        snippetText: business.snippet_text,
        numAttendees: 0
      });
    });
    return formattedRes;
  }

  private mergeWithDatabaseInfo(yelpResults: Result[]) {
    return this.getAttendedResults()
        .then(resultsWithAttendance => {
          resultsWithAttendance.forEach(result => {
            yelpResults.forEach(yelpResult => {
              if (result.resultUrl === yelpResult.url) {
                yelpResult.numAttendees = result.attendees.length;
              }
            });
          });
          return yelpResults;
        });
  }

  getAttendedResults() {
    return this.http
                .get('/api/getAttendedResults')
                .toPromise()
                .then(parseJson)
                .catch(handleError);
  }

  changeAttendance(resultUrl: string, twitterID: string) {
    let body = JSON.stringify({
      resultUrl: resultUrl,
      twitterID: twitterID
    });
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
    return this.http
                .post('/api/changeAttendance', body, options)
                .toPromise()
                .then(parseJson)
                .catch(handleError);
  }

}