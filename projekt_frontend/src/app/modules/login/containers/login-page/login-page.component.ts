import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {

  formGroup: FormGroup;
  errorMessage!: string;

  constructor(private fb:FormBuilder,
    protected authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar) {

      if (this.authService.isAuthenticated()) {
        this.router.navigate(['/dashboard'], { replaceUrl: true });
      }

      this.formGroup = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
  }

  login() {
    if (this.formGroup.invalid) {
      this.snackBar.open('Nazwa użytkownika i hasło jest wymagane.', 'Zamknij',
      { duration: 5000 });
      return;
    }
    const val = this.formGroup.value;

    if (val.username && val.password) {
      this.authService.login(val.username, val.password).subscribe (
        (response) => {
          console.log("User is logged in");
          sessionStorage.setItem('loggedUser', val.username);
          localStorage.setItem('tokenPZ', response.token);
          this.router.navigate(['/dashboard'], { replaceUrl: true });
        },
        (error) => {
          console.log(error);
          this.snackBar.open('Nazwa użytkownika lub hasło jest błędne.', 'Zamknij',
          { duration: 5000 });
        }
      );
    }
  }
}
