import { AuthService } from './../auth.service';
import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { QuotesComponent } from '../quotes/quotes.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-quote',
  templateUrl: './edit-quote.component.html',
  styleUrls: ['./edit-quote.component.scss']
})
export class EditQuoteComponent implements OnInit {

  id;
  content;
  authorId;
  authors;

  constructor(private route: ActivatedRoute, private dataService: DataService, private router: Router, public snackBar: MatSnackBar, private authService: AuthService) {
    this.route.params.subscribe(data => {
      this.id = data.id;
    })
  }

  ngOnInit() {
    this.dataService.getData(`${environment.api_url}/quotes/${this.id}`).subscribe(data => {
      this.content = data['content'];
      this.authorId = data['authorId'];
    });

    this.dataService.getData(`${environment.api_url}/Authors`).subscribe(data => {
  		this.authors = data;
  	});
  }

  updateQuote() {
    const editData = {
  		content: this.content,
  		authorId: this.authorId
  	};

    const token = this.authService.getAccessToken();

		this.dataService.updateData(`${environment.api_url}/quotes/${this.id}/?access_token=${token}`, editData).subscribe(data => {
			this.router.navigate([QuotesComponent]);
		}, (err) => {
      const message = err.error.error.message || 'Quote ' + err.error.error.details.messages.content[0];
		  this.snackBar.open(message, 'Close');
    });  	
  }

}
