import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

type Status = 'Active'|'Inactive';
type PipelineRow = {
  id: string;
  name: string;
  project: string;
  status: Status;
  trigger: string;
  lastRun: string; // ISO
};

@Component({
  selector: 'app-all-pipelines',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './all-pipelines.component.html',
  styleUrls: ['./all-pipelines.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllPipelinesComponent {
  public search = '';
  public projectFilter = 'All';
  public moreOpen = false;
  public statusFilter = new Set<Status>(); // пусто = оба статуса

  public projects = ['All','AI Review Platform','E-commerce Analytics','Mobile App Backend','Data Warehouse ETL'];

  public rows: PipelineRow[] = [
    { id:'p-main',  name:'Main Pipeline (main branch)', project:'AI Review Platform', status:'Active',   trigger:'push to main',     lastRun:'2024-01-15T14:30:00Z' },
    { id:'p-log',   name:'Log Analysis (staging)',      project:'AI Review Platform', status:'Inactive', trigger:'push to staging',  lastRun:'2024-01-14T11:00:00Z' },
    { id:'p-perf',  name:'Performance Testing',         project:'AI Review Platform', status:'Active',   trigger:'manual',           lastRun:'2024-01-15T09:15:00Z' },
    { id:'p-sales', name:'Daily Sales Report',          project:'E-commerce Analytics', status:'Active', trigger:'schedule daily',   lastRun:'2024-01-15T08:00:00Z' },
    { id:'p-seg',   name:'Customer Segmentation',       project:'E-commerce Analytics', status:'Active', trigger:'data change',      lastRun:'2024-01-15T12:45:00Z' },
    { id:'p-api',   name:'API Deployment',              project:'Mobile App Backend', status:'Active',   trigger:'push to production', lastRun:'2024-01-15T16:20:00Z' },
    { id:'p-db',    name:'Database Migration',          project:'Mobile App Backend', status:'Inactive', trigger:'manual',           lastRun:'2024-01-13T14:30:00Z' },
    { id:'p-push',  name:'Push Notification Service',   project:'Mobile App Backend', status:'Active',   trigger:'push to main',     lastRun:'2024-01-15T13:10:00Z' },
    { id:'p-etl',   name:'Daily ETL Process',           project:'Data Warehouse ETL', status:'Active',   trigger:'schedule daily',   lastRun:'2024-01-15T02:00:00Z' },
    { id:'p-clean', name:'Weekly Data Cleanup',         project:'Data Warehouse ETL', status:'Inactive', trigger:'schedule weekly',  lastRun:'2024-01-08T03:30:00Z' },
  ];

  public filtered(): PipelineRow[] {
    const q = this.search.trim().toLowerCase();
    return this.rows.filter(r => {
      if (this.projectFilter !== 'All' && r.project !== this.projectFilter) return false;
      if (this.statusFilter.size && !this.statusFilter.has(r.status)) return false;
      if (!q) return true;
      return r.name.toLowerCase().includes(q) || r.project.toLowerCase().includes(q);
    });
  }

  public toggleStatus(s: Status): void {
    this.statusFilter.has(s) ? this.statusFilter.delete(s) : this.statusFilter.add(s);
  }
}
