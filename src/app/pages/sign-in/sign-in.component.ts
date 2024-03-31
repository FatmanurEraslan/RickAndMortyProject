import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../shared/services/auth/auth.service';
import { Observable } from 'rxjs/internal/Observable';
import { AuthResponse } from '../../core/interface/auth-response.interface';
import { ErrorService } from '../shared/services/error/error.service';
import { User } from '../../core/model/user.model';


@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule, ReactiveFormsModule, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  signInForm!: FormGroup;
  passwordVisible: boolean = false;
  error: any;
  errorMessages: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private errorService: ErrorService
  ) {
    this.errorMessages = this.errorService.errorsMessages;
  }

  ngOnInit(): void {

    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
  onSubmit() {
    if (this.signInForm.invalid) {
      return;
    }
    const email = this.signInForm.value.email;
    const password = this.signInForm.value.password;

    let authObservable: Observable<AuthResponse>;

    authObservable = this.authService.signIn(email, password);

    authObservable.subscribe(data => {

      this.router.navigateByUrl('/home');
    },
      err => {
       this.error =this.errorMessages[err];

      }
    )
  }
  
}
