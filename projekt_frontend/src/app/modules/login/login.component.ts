import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username?: string;
  password?: string;

  login() {
    // Logika obsługi logowania - np. wysłanie żądania do backendu
    console.log('Logowanie:', this.username, this.password);
  }
}
