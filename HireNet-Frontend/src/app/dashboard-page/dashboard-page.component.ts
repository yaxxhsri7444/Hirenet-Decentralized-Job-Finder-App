import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { DashboardService } from '../services/dashboard.service';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthUserService } from '../services/auth-user.service';

@Component({
  selector: 'app-dashboard-page',
  imports: [CommonModule, NgChartsModule, RouterLink],
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent implements OnInit {
  stats: any[] = [];
  chartData: any;
  chartLabels: string[] = [];
  recentApplications: string[] = [];
  resumeUrl: string = '';

  constructor(
    private dashboardService: DashboardService,
    private userService: AuthUserService
  ) {}

  ngOnInit(): void {
    const userId = this.userService.getUserId();
    if (!userId) {
      console.error('❌ User ID is missing. Cannot fetch user.');
      return; // Don't call API with undefined ID
    }

    this.loadDashboardStats();

    this.userService.getUserbyId(userId).subscribe((res: any) => {
      this.resumeUrl = res.resumeUrl;
    });
  }

  loadDashboardStats(): void {
    this.dashboardService.getStats().subscribe((res: any) => {
      this.stats = [
        { title: 'Total Jobs', value: res.totalJobs, color: 'bg-primary' },
        { title: 'Total Users', value: res.totalUsers, color: 'bg-success' },
        {
          title: 'Applications',
          value: res.totalApplications,
          color: 'bg-warning',
        },
        {
          title: 'Active Chats',
          value: res.activeChats || 0,
          color: 'bg-info',
        },
      ];

      // Chart Example
      this.chartLabels = res.chart?.labels || ['January', 'February', 'March'];
      this.chartData = {
        labels: this.chartLabels,
        datasets: [
          {
            label: 'Applications',
            data: res.chart?.data || [0, 0, 0],
            backgroundColor: '#0d6efd',
          },
        ],
      };

      this.recentApplications = res.recentApplications || ['No data'];
    });
  }
}
