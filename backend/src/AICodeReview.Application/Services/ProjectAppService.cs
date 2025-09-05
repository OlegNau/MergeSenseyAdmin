using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Repositories;
using Volo.Abp;
using AICodeReview.Permissions;
using AICodeReview.Projects;
using AICodeReview.Projects.Dtos;
using AICodeReview.Pipelines;
using AICodeReview.Pipelines.Dtos;
using AICodeReview.Mapping;

namespace AICodeReview.Services;

[Authorize(AICodeReviewPermissions.Projects.Default)]
public class ProjectAppService :
    CrudAppService<Project, ProjectDto, Guid, PagedAndSortedResultRequestDto, ProjectCreateDto, ProjectUpdateDto>,
    IProjectAppService
{
    protected override string GetPolicyName { get; set; } = AICodeReviewPermissions.Projects.Default;
    protected override string GetListPolicyName { get; set; } = AICodeReviewPermissions.Projects.Default;
    protected override string CreatePolicyName { get; set; } = AICodeReviewPermissions.Projects.Create;
    protected override string UpdatePolicyName { get; set; } = AICodeReviewPermissions.Projects.Update;
    protected override string DeletePolicyName { get; set; } = AICodeReviewPermissions.Projects.Delete;

    private readonly IRepository<Pipeline, Guid> _pipelineRepository;
    private readonly IRepository<Project, Guid> _projectRepository;

    public ProjectAppService(
        IRepository<Project, Guid> repository,
        IRepository<Pipeline, Guid> pipelineRepository)
        : base(repository)
    {
        _pipelineRepository = pipelineRepository;
        _projectRepository = repository;
    }

    [HttpGet("{id}/summary")]
    public virtual async Task<ProjectSummaryDto> GetSummaryAsync(Guid id)
    {
        var projectQuery = (await _projectRepository.GetQueryableAsync()).Where(p => p.Id == id);
        var pipelineQuery = await _pipelineRepository.GetQueryableAsync();

        var dto = await AsyncExecuter.FirstOrDefaultAsync(
            CicdProfiles.ProjectToSummary(projectQuery, pipelineQuery));

        if (dto == null)
        {
            throw new EntityNotFoundException(typeof(Project), id);
        }

        return dto;
    }

    [HttpGet("{id}/pipelines")]
    public virtual async Task<List<PipelineListItemDto>> GetPipelinesAsync(Guid id)
    {
        var pipelineQuery = await _pipelineRepository.GetQueryableAsync();
        var projectQuery = await _projectRepository.GetQueryableAsync();

        var query = from pl in pipelineQuery.AsNoTracking().Where(x => x.ProjectId == id)
                    join pr in projectQuery on pl.ProjectId equals pr.Id
                    orderby pl.CreationTime descending
                    select new PipelineListItemDto
                    {
                        Id = pl.Id,
                        Name = pl.Name,
                        ProjectName = pr.Name,
                        Status = pl.Status,
                        LastRun = pl.FinishedAt ?? pl.StartedAt
                    };

        return await AsyncExecuter.ToListAsync(query);
    }
}
