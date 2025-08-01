import { Component, OnInit } from '@angular/core';
import { jobService } from '../services/job.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-detail',
  imports: [CommonModule],
  templateUrl: './job-detail.component.html',
  styleUrl: './job-detail.component.css',
})
export class JobDetailComponent implements OnInit {
  jobId!: string;
  jobs: any;
  loading = true;
  job: any;
  

  constructor(
    private route: ActivatedRoute,
    private jobService: jobService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.jobId = this.route.snapshot.paramMap.get('id')!;
    if (this.jobId) {
      this.fetchJobDetails();
    } else {
      console.error('Job ID not found in route');
    }
  }

  fetchJobDetails(): void {
    this.jobService.getmyjob(this.jobId).subscribe({
      next: (res) => {
        this.jobs = res.jobs;
        this.loading = false;
        console.log('Job ID:', this.jobId);
        console.log('Response:', res);
      },
      error: (err) => {
        console.error('Error fetching job:', err);
        this.loading = false;
      },
    });
  }


  // applyForJob(){
  //   this.jobService.applyjob(this.jobId).subscribe({
  //     next: (res) => {
  //       console.log('Application successful:', res);
  //       alert('Application successful!');
  //     },
  //     error: (err) => {
  //       console.error('Error applying for job:', err);
  //       alert('Failed to apply for job. Please try again later.');
  //     },
  //   });
  // }

  apply(){
    
  }


  sendMessageToEmployer() {
    const employerId = this.job?.postedBy;
    if (employerId) {
      this.router.navigate(['/chat', employerId]);
    } else {
      console.log('Employer information not available.');
    }
  }
}
