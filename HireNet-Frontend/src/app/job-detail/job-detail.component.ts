import { Component } from '@angular/core';
import { jobService } from '../services/job.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-detail',
  imports: [CommonModule],
  templateUrl: './job-detail.component.html',
  styleUrl: './job-detail.component.css'
})
export class JobDetailComponent {
   jobId!: string;
  job: any;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private jobService: jobService
  ) {}

  ngOnInit(): void {
    this.jobId = this.route.snapshot.paramMap.get('id')!;
    this.fetchJobDetails();
  }

  fetchJobDetails() {
    this.jobService.getmyjob(this.jobId).subscribe({
      next: (res) => {
        this.job = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching job:', err);
        this.loading = false;
      }
    });
  }
}
