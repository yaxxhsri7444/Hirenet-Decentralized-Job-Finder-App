import { Component } from '@angular/core';
import { OptVerificationService } from '../services/opt-verification.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-phoneverify',
  imports: [CommonModule],
  templateUrl: './phoneverify.component.html',
  styleUrl: './phoneverify.component.css'
})
export class PhoneverifyComponent {
  phone: string = '';
  enteredOtp: string = '';
  isOtpSent: boolean = false;
  isVerified: boolean = false;

  constructor(private otpservice: OptVerificationService, private router : Router){}

  sentOtp() {
    this.otpservice.sentOtp(this.phone).subscribe(() => {
      this.isOtpSent = true
      alert('OTP sent successfully! Please check your phone.');
    });
  }

  verifyOtp() {
    this.otpservice.verifyOtp(this.phone, this.enteredOtp).subscribe((res: any) => {
      this.isVerified = res.verified;
      this.router.navigate(['/profile']);
      alert('OTP verified successfully! You can now proceed to your profile.');
      alert(res.verified ? 'OTP is valid.' : 'OTP is invalid. Please try again.');
    });
  }
}
