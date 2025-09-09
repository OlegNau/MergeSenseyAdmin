import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay } from 'rxjs';
import { environment } from '../../../environments/environment';

export type PipelineDto = {
  id: string;
  name: string;
  projectId?: string;
};

@Injectable({ providedIn: 'root' })
export class PipelineApi {
  private http = inject(HttpClient);
  private base = environment.apis.default.url.replace(/\/+$/, '');

  getAll() {
    return this.http
      .get<{ items: PipelineDto[] }>(`${this.base}/api/app/pipeline/all`)
      .pipe(map((r) => r.items), shareReplay({ bufferSize: 1, refCount: true }));
  }
}
