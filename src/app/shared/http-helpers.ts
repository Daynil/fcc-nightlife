import { Response } from '@angular/http';

/** Parse server data to json, throw error on non-200 status */
export function parseJson(res: Response) {
  if (res.status < 200 || res.status >= 300) {
    throw new Error(`Response status: ${res.status}`);
  }
  let body = res.json();
  return body;
}

/** Log error any errors */
export function handleError(error: any) {
  let errorMsg = error.message || 'Server error';
  console.log(errorMsg);
}