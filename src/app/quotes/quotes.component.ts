import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {

	quotes;
	pageLength: number;
	pageSize = 5;
	isLoggedIn;

  	constructor(private dataService: DataService, private authService: AuthService) { 
		this.isLoggedIn = this.authService.isLoggedIn();;
  	}

  	ngOnInit() {
  		this.getData();
  		this.getCount();
	}

	getData() {
		this.dataService.getData(`${environment.api_url}/Quotes/?filter[include]=author&filter[limit]=${this.pageSize}`).subscribe(data => {
			this.quotes = data;
		});
	}
	  
	getCount() {
		this.dataService.getData(`${environment.api_url}/Quotes/count`).subscribe(data => {
			this.pageLength = data['count'];
		});
	}

  	pageEvent(e) {
  		const pageIndex = e.pageIndex;
  		const pageSize = e.pageSize;
  		const skip = pageIndex * pageSize;

  		this.dataService.getData(`${environment.api_url}/Quotes/?filter[include]=author&filter[limit]=${pageSize}&filter[skip]=${skip}`).subscribe(data => {
  			this.quotes = data;
  		});
	}
	  
	deleteQuote(id, i) {
		this.dataService.deleteData(`${environment.api_url}/Quotes/${id}`).subscribe(data => {
			this.quotes.splice(i, 1);	
			this.getData();
			this.getCount();
		});
	}

}
