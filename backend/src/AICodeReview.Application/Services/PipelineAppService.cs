using System;
using System.Linq;
using System.Threading.Tasks;
using System.Linq.Dynamic.Core;
using Microsoft.AspNetCore.Authorization;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Linq;
using AICodeReview.Permissions;
using AICodeReview.Pipelines;
using AICodeReview.Pipelines.Dtos;
using AICodeReview.Projects;

namespace AICodeReview.Services;

[Authorize(AICodeReviewPermissions.Pipelines.Default)]
public class PipelineAppService :
    CrudAppService<Pipeline, PipelineDto, Guid, PipelineGetListInput, PipelineCreateDto, PipelineUpdateDto>,
    IPipelineAppService
{
    protected override string GetPolicyName { get; set; } = AICodeReviewPermissions.Pipelines.Default;
    protected override string GetListPolicyName { get; set; } = AICodeReviewPermissions.Pipelines.Default;
    protected override string CreatePolicyName { get; set; } = AICodeReviewPermissions.Pipelines.Create;
    protected override string UpdatePolicyName { get; set; } = AICodeReviewPermissions.Pipelines.Update;
    protected override string DeletePolicyName { get; set; } = AICodeReviewPermissions.Pipelines.Delete;

    private readonly IRepository<Project, Guid> _projectRepository;

    public PipelineAppService(
        IRepository<Pipeline, Guid> repository,
        IRepository<Project, Guid> projectRepository)
        : base(repository)
    {
        _projectRepository = projectRepository;
    }

    protected override async Task<IQueryable<Pipeline>> CreateFilteredQueryAsync(PipelineGetListInput input)
    {
        var query = await base.CreateFilteredQueryAsync(input);

        if (input.ProjectId.HasValue)
        {
            var pid = input.ProjectId.Value;
            query = query.Where(x => x.ProjectId == pid);
        }

        if (!string.IsNullOrWhiteSpace(input.Filter))
        {
            var filter = input.Filter!;
            query = query.Where(x => x.Name.Contains(filter));
        }

        return query;
    }

    public virtual async Task<PagedResultDto<PipelineListItemDto>> GetAllAsync(PipelineGetListInput input)
    {
        var pipelineQuery = await Repository.GetQueryableAsync();
        var projectQuery  = await _projectRepository.GetQueryableAsync();

        var listQuery =
            from pl in pipelineQuery
            join pr in projectQuery on pl.ProjectId equals pr.Id
            where (!input.ProjectId.HasValue || pl.ProjectId == input.ProjectId.Value)
               && (string.IsNullOrWhiteSpace(input.Filter) || pl.Name.Contains(input.Filter!))
            select new PipelineListItemDto
            {
                Id          = pl.Id,
                Name        = pl.Name,
                ProjectName = pr.Name,
                Status      = pl.Status,
                LastRun     = pl.FinishedAt ?? pl.StartedAt
            };

        var total = await AsyncExecuter.CountAsync(listQuery);

        var sorting = (input.Sorting ?? "LastRun desc").Trim();
        string sortExpression =
            sorting.StartsWith("LastRun", StringComparison.OrdinalIgnoreCase) ? sorting :
            sorting.StartsWith("Name",    StringComparison.OrdinalIgnoreCase) ? sorting :
            sorting.StartsWith("Status",  StringComparison.OrdinalIgnoreCase) ? sorting :
            "LastRun desc";

        var items = await AsyncExecuter.ToListAsync(
            listQuery
                .OrderBy(sortExpression)
                .Skip(input.SkipCount)
                .Take(input.MaxResultCount)
        );

        return new PagedResultDto<PipelineListItemDto>(total, items);
    }

    public override Task<PipelineDto> CreateAsync(PipelineCreateDto input)
        => base.CreateAsync(input);
}
