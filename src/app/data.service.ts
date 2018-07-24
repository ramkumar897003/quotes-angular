import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getData(url) {
  	return this.http.get(url);
  }

  postData(url, data) {
  	const headers = new HttpHeaders({
  		'Content-Type': 'application/json'
  	});

  	return this.http.post(url, data, { headers: headers });
  }

  updateData(url, data) {
  	const headers = new HttpHeaders({
  		'Content-Type': 'application/json'
  	});

  	return this.http.put(url, data, { headers: headers });
  }

  deleteData(url) {
    return this.http.delete(url);
  }
}
