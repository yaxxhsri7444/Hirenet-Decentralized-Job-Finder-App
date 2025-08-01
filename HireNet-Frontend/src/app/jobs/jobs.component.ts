import { Component, NgModule, NgModuleRef } from '@angular/core';
import { jobService } from '../services/job.service';
import { NgModel } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jobs',
  imports: [CommonModule, RouterLink],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css',
})
export class JobsComponent {
  jobs: any[] = [];
  loading: boolean = true;
  constructor(private jobService: jobService) {}

  ngOnInit() {
    this.fetchJobs();
  }

  fetchJobs() {
    this.jobService.getJobs().subscribe({
      next: (res) => {
        this.jobs = res.jobs; // ✅ Access 'jobs' from the response
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error loading jobs:', err);
        this.loading = false;
      },
    });
  }
}
