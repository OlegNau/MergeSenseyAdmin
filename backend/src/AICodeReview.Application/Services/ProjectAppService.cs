using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Repositories;
using AICodeReview.Permissions;
using AICodeReview.Projects;
using AICodeReview.Projects.Dtos;
using AICodeReview.Pipelines;
using AICodeReview.Pipelines.Dtos;

namespace AICodeReview.Services;

[Authorize(AICodeReviewPermissions.Projects.Default)]
public class ProjectAppService :
    CrudAppService<Project, ProjectDto, Guid, ProjectGetListInput, ProjectCreateDto, ProjectUpdateDto>,
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

    protected override async Task<IQueryable<Project>> CreateFilteredQueryAsync(ProjectGetListInput input)
    {
        var query = await base.CreateFilteredQueryAsync(input);
        if (!string.IsNullOrWhiteSpace(input.Filter))
        {
            query = query.Where(x => x.Name.Contains(input.Filter!) || x.RepoPath.Contains(input.Filter!));
        }
        if (!string.IsNullOrWhiteSpace(input.Provider))
        {
            query = query.Where(x => x.Provider == input.Provider);
        }
        if (input.IsActive.HasValue)
        {
            query = query.Where(x => x.IsActive == input.IsActive);
        }
        return query;
    }

    public virtual async Task<ProjectSummaryDto> GetSummaryAsync(Guid id)
    {
        var project = await Repository.GetAsync(id);
        var pipelineQuery = await _pipelineRepository.GetQueryableAsync();
        var total = await AsyncExecuter.CountAsync(pipelineQuery.Where(x => x.ProjectId == id));
        var active = await AsyncExecuter.CountAsync(pipelineQuery.Where(x => x.ProjectId == id && x.IsActive));

        return new ProjectSummaryDto
        {
            Id = project.Id,
            Name = project.Name,
            Provider = project.Provider,
            RepoPath = project.RepoPath,
            DefaultBranch = project.DefaultBranch,
            ActivePipelinesCount = active,
            TotalPipelinesCount = total
        };
    }

    public virtual async Task<List<PipelineListItemDto>> GetPipelinesAsync(Guid id)
    {
        var pipelineQuery = await _pipelineRepository.GetQueryableAsync();
        var projectQuery = await _projectRepository.GetQueryableAsync();

        var query = from pl in pipelineQuery.Where(x => x.ProjectId == id)
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
