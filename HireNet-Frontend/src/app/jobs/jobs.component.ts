import { Component, NgModule, NgModuleRef } from '@angular/core';
import { jobService } from '../services/job.service';
import { NgModel } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jobs',
  imports: [CommonModule],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent {
  jobs: any[] = [];
  constructor(private jobService :jobService) {}

ngOnInit() {
  this.jobService.getJobs().subscribe((data) => {
    this.jobs = data;
  });
}

}
