import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OptVerificationService {

  constructor(private http : HttpClient) { }
  private apiUrl = 'http://localhost:5000/users';

  sentOtp(phone : string){
    return this.http.post(`${this.apiUrl}/sendotp`, { phone });
  }

  verifyOtp(phone: string, otp:string){
    return this.http.post(`${this.apiUrl}/verifyotp`, { phone, otp });
  }
}
