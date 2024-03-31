
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../../../core/service/api.service';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { config } from '../../../../config';
import { AuthResponse } from '../../../../core/interface/auth-response.interface';
import { ErrorService } from '../error/error.service';
import { User } from '../../../../core/model/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public url = config.API_URL;
  user = new BehaviorSubject<User | null>(null);
  private tokenExpirationTimer: any;


  constructor(private http: HttpClient, private errorSevice: ErrorService, private router: Router) {

  }
  signUp(email: any, password: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${config.API_KEY}`, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(err => {
        return this.errorSevice.handleError(err);
      }),
      tap(res => {
        this.authenticatedUser(res.email, res.localId, res.idToken, res.expiresIn);
      })
    );
  }
  signIn(email: any, password: any) {
    return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${config.API_KEY}`, {
      email: email,
      password: password,
      returnSecureToken: true
    })
      .pipe(
        catchError(err => {
          return this.errorSevice.handleError(err);
        }),
        tap(res => {
          this.authenticatedUser(res.email, res.localId, res.idToken, res.expiresIn);
        })
      );
  }
  private authenticatedUser(email: any, userId: any, token: any, expiresIn: any) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoSignOut(expiresIn * 1000);
    localStorage.setItem('UserData', JSON.stringify(user));
  }
  autoSignIn() {
    if (typeof localStorage !== 'undefined') {
      const userDataString = localStorage.getItem('UserData');

      if (userDataString) {
        const userData = JSON.parse(userDataString);
        const loggedInUser = new User(userData.email, userData.userId, userData.token, new Date(userData.tokenExpirationDate));

        if (loggedInUser.token) {
          this.user.next(loggedInUser);
          const expirationDuration = new Date(userData.tokenExpirationDate).getTime() - new Date().getTime();
          this.autoSignOut(expirationDuration);
        }
      }
    }
  }


  signOut() {
    this.user.next(null);
    this.router.navigate(['']);
    localStorage.removeItem('UserData');
    const userDataString = localStorage.getItem('UserData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }
  autoSignOut(exprationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.signOut();
    }, exprationDuration);
  }

  getUserId() {
    if (typeof localStorage !== 'undefined') {
      const userDataString = localStorage.getItem('UserData');

      if (userDataString) {
        const userData = JSON.parse(userDataString);
        return userData.id;
      }
    }

  }
  logged() {
    let userId = this.getUserId();
    console.log(userId)
    if (userId == undefined) {
      return false
    }
    else {
      return true
    }
  }


}
