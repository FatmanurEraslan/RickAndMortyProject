import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }
  handleError(err:HttpErrorResponse){
    if(!err.error || !err.error.error){
      return throwError('UNKNOWN')

    }
    else{
      return throwError(err.error.error.message)


    }
  }
  errorsMessages = {
    UNKNOWN: 'An UNknown Error is Occured',
    EMAIL_EXISTS: 'This Email is Already Exist.Please try with another email',
    OPERATION_NOT_ALLOWED: 'Password sign-in is disabled for this project',
    TOO_MANY_ATTEMTS_TRY_LATER: 'We have blocked all request from this project',
    EMAIL_NOT_FOUND: 'There is no user record corresponding to this email',
    INVALID_PASSWORD: 'This password is invalid ',
    USER_DISABLED: 'The user account has been disabled by an administrator.',
    INVALID_LOGIN_CREDENTIALS:'Invalid credentials'
  }
}
