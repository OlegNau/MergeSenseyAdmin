import type { EntityDto } from '@abp/ng.core';

export interface ProjectDto extends EntityDto<string> {
  name?: string;
  description?: string;
  gitAccessToken?: string;
}
