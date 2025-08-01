import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { jobService } from '../services/job.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-create',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './job-create.component.html',
  styleUrl: './job-create.component.css'
})
export class JobCreateComponent {
   jobForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private jobService: jobService,
    private router: Router
  ) {
    this.jobForm = this.fb.group({
      title: ['', Validators.required],
      company: ['', Validators.required],
      description: ['', Validators.required],
      salary: ['', Validators.required],
      location: ['', Validators.required],
      type: ['Full-time', Validators.required] // Full-time / Part-time / Remote
    });
  }

  onSubmit() {
    if (this.jobForm.invalid) return;

    this.isSubmitting = true;
    this.jobService.createJob(this.jobForm.value).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        alert('✅ Job created successfully!');
        this.router.navigate(['/jobs']);
      },
      error: (err) => {
        console.error('Error creating job', err);
        this.isSubmitting = false;
      }
    });
  }
}
