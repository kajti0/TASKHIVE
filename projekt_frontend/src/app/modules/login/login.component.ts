import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username?: string;
  password?: string;
  
  constructor(private router: Router, private loginService: LoginService) {}

  login() {
    this.loginService.login(this.username ?? '', this.password ?? '').subscribe(
      (response: any) => {
        console.log('Zalogowano:', response);
        // Możesz tu dodać obsługę sukcesu, np. przeniesienie do strony kalendarza
        this.router.navigate(['\calendar']);
      },
      (error: any) => {
        console.error('Błąd logowania:', error);
        // Możesz tu dodać obsługę błędu, np. wyświetlenie komunikatu użytkownikowi
      }
    );
  }
}
