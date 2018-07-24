import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material';
import { QuotesComponent } from '../quotes/quotes.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-quote',
  templateUrl: './create-quote.component.html',
  styleUrls: ['./create-quote.component.scss']
})
export class CreateQuoteComponent implements OnInit {

  authors;
  content;
  authorId;

  constructor(private dataService: DataService, public snackBar: MatSnackBar, private router: Router, private authService: AuthService) { }

  ngOnInit() {
  	this.dataService.getData(`${environment.api_url}/Authors`).subscribe(data => {
  		console.log(data);
  		this.authors = data;
  	});
  }

  saveQuote() {
  	const postData = {	
  		content: this.content,
  		authorId: this.authorId
  	};

	const token = this.authService.getAccessToken();

	this.dataService.postData(`${environment.api_url}/quotes?access_token=${token}`, postData).subscribe(data => {
		this.snackBar.open('Quote created successfully!', 'Close');
		this.router.navigate([QuotesComponent]);
	}, (err) => {
		const message = err.error.error.message || 'Quote ' + err.error.error.details.messages.content[0];
		this.snackBar.open(message, 'Close');
	})  	
  }

}
