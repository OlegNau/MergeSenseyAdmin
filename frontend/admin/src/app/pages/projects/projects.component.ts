import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

type Project = {
  id: string;
  name: string;
  description?: string;
  updatedAt?: string;
  status?: 'active' | 'archived';
};

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  private readonly router = inject(Router);

  projects = signal<Project[]>([
    {
      id: '1',
      name: 'Alpha Project',
      description: 'First project',
      updatedAt: '2024-06-01',
      status: 'active',
    },
    {
      id: '2',
      name: 'Beta Project',
      description: 'Second project',
      updatedAt: '2024-05-20',
      status: 'archived',
    },
    {
      id: '3',
      name: 'Gamma Project',
      description: 'Third project',
      updatedAt: '2024-05-25',
      status: 'active',
    },
  ]);
  // TODO: load projects from API (без внешних пакетов)

  query = signal('');
  tag = signal<'all' | 'active' | 'archived'>('all');
  sort = signal<'updated' | 'name'>('updated');

  filtered = computed(() => {
    let list = this.projects();
    const q = this.query().toLowerCase();
    if (q) {
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q)
      );
    }
    const tag = this.tag();
    if (tag !== 'all') {
      list = list.filter(p => p.status === tag);
    }
    const sort = this.sort();
    return [...list].sort((a, b) => {
      if (sort === 'name') {
        return a.name.localeCompare(b.name);
      }
      const ad = a.updatedAt ? Date.parse(a.updatedAt) : 0;
      const bd = b.updatedAt ? Date.parse(b.updatedAt) : 0;
      return bd - ad;
    });
  });

  trackById = (_: number, p: { id: string }) => p.id;

  createProject() {
    this.router.navigate(['/create-project']);
  }

  openProject(id: string) {
    this.router.navigate(['/project-detail', id]);
  }
}
