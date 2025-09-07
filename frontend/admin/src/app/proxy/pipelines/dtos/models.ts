import type { EntityDto } from '@abp/ng.core';

export interface PipelineDto extends EntityDto<string> {
  name?: string;
  projectId?: string;
  status?: string;
  trigger?: string;
  lastRun?: string;
  startedAt?: string;
  finishedAt?: string;
  duration?: number;
}
