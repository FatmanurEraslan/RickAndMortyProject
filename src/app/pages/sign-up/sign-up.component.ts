import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../shared/services/auth/auth.service';
import { AuthResponse } from '../../core/interface/auth-response.interface';
import { Observable } from 'rxjs';
import { ErrorService } from '../shared/services/error/error.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule, ReactiveFormsModule, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  signUpForm!: FormGroup;
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
    
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.checkPasswords });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
  checkPasswords(group: FormGroup | null) {
    if (!group) return null; // Guard clause

    const passwordControl = group.get('password');
    const confirmPasswordControl = group.get('confirmPassword');

    if (!passwordControl || !confirmPasswordControl) return null; // Guard clause

    const password = passwordControl.value;
    const confirmPassword = confirmPasswordControl.value;

    return password === confirmPassword ? null : { notSame: true };
  }

  onSubmit() {
    if (this.signUpForm.invalid) {
      return;
    }
    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;
    
    let authObservable: Observable<AuthResponse>;

    authObservable = this.authService.signUp(email, password);

    authObservable.subscribe(data => {

      this.router.navigateByUrl('/home');
    },
      err => {
       this.error =this.errorMessages[err];

      }
    )

}

}