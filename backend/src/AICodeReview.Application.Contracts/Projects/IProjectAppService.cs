using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using AICodeReview.Pipelines.Dtos;

namespace AICodeReview.Projects.Dtos;

public interface IProjectAppService :
    ICrudAppService<ProjectDto, Guid, ProjectGetListInput, ProjectCreateDto, ProjectUpdateDto>
{
    Task<PagedResultDto<ProjectSummaryDto>> GetSummariesAsync(ProjectGetListInput input);
}