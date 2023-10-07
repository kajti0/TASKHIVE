import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username?: string;
  password?: string;
  
  constructor(private router: Router, private loginService: LoginService, private authService: AuthService) {}

  login() {
    this.loginService.login(this.username ?? '', this.password ?? '').subscribe(
      (response: any) => {
        console.log('Zalogowano:', response);
        //console.log('ID Użytkownika: ', this.authService.getUserId())
        this.router.navigate(['\calendar']);
      },
      (error: any) => {
        console.error('Błąd logowania:', error);
      }
    );
  }
  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
