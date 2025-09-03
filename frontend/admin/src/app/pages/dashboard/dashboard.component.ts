import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

type Stat = {
  id: string;
  title: string;
  value: string | number;
  deltaText: string;        // "+12% from last month"
  deltaDir: 'up'|'down';    // влияет на цвет
  icon: 'trend'|'activity'|'code'|'bug'|'team'|'time';
};
type Activity = {
  id: string; title: string; project: string; status: 'Active'|'Inactive';
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  public stats: Stat[] = [
    { id:'total',    title:'Total Projects',  value:4,   deltaText:'+12% from last month', deltaDir:'up',   icon:'trend' },
    { id:'pipelines',title:'Active Pipelines',value:7,   deltaText:'+8% from last month',  deltaDir:'up',   icon:'activity' },
    { id:'loc',      title:'Lines of Code',   value:'2.4M', deltaText:'+15% from last month', deltaDir:'up', icon:'code' },
    { id:'bugs',     title:'Bugs Solved',     value:142, deltaText:'-5% from last month',  deltaDir:'down', icon:'bug' },
    { id:'team',     title:'Team Members',    value:24,  deltaText:'+2 from last month',   deltaDir:'up',   icon:'team' },
    { id:'runtime',  title:'Avg Runtime',     value:'3.2m', deltaText:'-12% from last month', deltaDir:'down', icon:'time' },
  ];

  public activities: Activity[] = [
    { id:'a1', title:'Main Pipeline (main branch)', project:'AI Review Platform', status:'Active' },
    { id:'a2', title:'Log Analysis (staging)',      project:'AI Review Platform', status:'Inactive' },
    { id:'a3', title:'Daily Sales Report',          project:'E-commerce Analytics', status:'Active' },
    { id:'a4', title:'Customer Segmentation',       project:'E-commerce Analytics', status:'Active' },
    { id:'a5', title:'API Deployment',              project:'Mobile App Backend', status:'Active' },
    { id:'a6', title:'Database Migration',          project:'Mobile App Backend', status:'Inactive' },
  ];

  public performance = {
    successRate: 94.2,   // %
    avgDuration: 72,     // % длины полосы (визуальная метрика)
    queueTime: 35,       // %
    avgDurationText: '3.2 minutes',
    queueTimeText: '12 seconds',
  };
}
