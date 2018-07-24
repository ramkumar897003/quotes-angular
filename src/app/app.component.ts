import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoggedIn;

  	constructor(private authService: AuthService, private router: Router) { 
    }
    
    routeChanged() {
      this.isLoggedIn = this.authService.isLoggedIn();
    }

    onLogout() {
      this.authService.logout().subscribe(data => {
        localStorage.removeItem('token');
        this.router.navigateByUrl('/login');
      });
    }
}
