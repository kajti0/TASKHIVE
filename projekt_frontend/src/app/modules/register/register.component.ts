import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username?: string;
  password?: string;
  confirmPassword?: string;

  constructor(private registerService: RegisterService, private router: Router) {}

  register() {
    if (this.password !== this.confirmPassword) {
      alert('Hasło i potwierdzenie hasła nie są zgodne');
      return;
    }

    if (!this.username || !this.password || !this.confirmPassword) {
      alert('Wypełnij wszystkie pola');
      return;
    }

    this.registerService.register(this.username?? '', this.password?? '').subscribe(
      response => {
        console.log('Rejestracja udana:', response);
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Błąd rejestracji:', error);
      }
    );
  }
}
