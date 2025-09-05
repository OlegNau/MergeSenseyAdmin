using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using AICodeReview.Permissions;
using AICodeReview.Pipelines;
using AICodeReview.Pipelines.Dtos;
using AICodeReview.Projects;

namespace AICodeReview.Services;

[Authorize(AICodeReviewPermissions.Pipelines.Default)]
[RemoteService]
[Route("api/app/pipelines")]
public class PipelineAppService :
    CrudAppService<Pipeline, PipelineDto, Guid, PagedAndSortedResultRequestDto, PipelineCreateDto, PipelineUpdateDto>,
    IPipelineAppService
{
    protected override string GetPolicyName { get; set; } = AICodeReviewPermissions.Pipelines.Default;
    protected override string GetListPolicyName { get; set; } = AICodeReviewPermissions.Pipelines.Default;
    protected override string CreatePolicyName { get; set; } = AICodeReviewPermissions.Pipelines.Create;
    protected override string UpdatePolicyName { get; set; } = AICodeReviewPermissions.Pipelines.Update;
    protected override string DeletePolicyName { get; set; } = AICodeReviewPermissions.Pipelines.Delete;

    private readonly IRepository<Project, Guid> _projectRepository;

    public PipelineAppService(IRepository<Pipeline, Guid> repository, IRepository<Project, Guid> projectRepository)
        : base(repository)
    {
        _projectRepository = projectRepository;
    }

    [HttpGet("all")]
    public virtual async Task<PagedResultDto<PipelineListItemDto>> GetAllAsync(PagedAndSortedResultRequestDto input)
    {
        var pipelineQuery = (await Repository.GetQueryableAsync()).AsNoTracking();
        var projectQuery = await _projectRepository.GetQueryableAsync();

        var query = from pl in pipelineQuery
                    join pr in projectQuery on pl.ProjectId equals pr.Id
                    select new PipelineListItemDto
                    {
                        Id = pl.Id,
                        Name = pl.Name,
                        ProjectName = pr.Name,
                        Status = pl.Status,
                        LastRun = pl.FinishedAt ?? pl.StartedAt
                    };

        var total = await AsyncExecuter.CountAsync(query);
        var items = await AsyncExecuter.ToListAsync(
            query.OrderBy(input.Sorting ?? nameof(Pipeline.CreationTime))
                 .Skip(input.SkipCount)
                 .Take(input.MaxResultCount));

        return new PagedResultDto<PipelineListItemDto>(total, items);
    }
}
