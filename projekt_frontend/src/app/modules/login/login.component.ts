import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username?: string;
  password?: string;
  
  constructor(private router: Router) {}

  login() {
    // Logika obsługi logowania - np. wysłanie żądania do backendu
    console.log('Logowanie:', this.username, this.password);

    this.router.navigate(['/calendar']);
  }
}
