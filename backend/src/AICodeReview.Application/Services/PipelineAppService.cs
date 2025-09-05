using System;
using System.Linq;
using System.Threading.Tasks;
using System.Linq.Dynamic.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using AICodeReview.Permissions;
using AICodeReview.Pipelines;
using AICodeReview.Pipelines.Dtos;
using AICodeReview.Projects;
using Volo.Abp.Linq;

namespace AICodeReview.Services;

[Authorize(AICodeReviewPermissions.Pipelines.Default)]
[Route("api/app/pipelines")]
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

    public PipelineAppService(IRepository<Pipeline, Guid> repository, IRepository<Project, Guid> projectRepository)
        : base(repository)
    {
        _projectRepository = projectRepository;
    }

    protected override async Task<IQueryable<Pipeline>> CreateFilteredQueryAsync(PipelineGetListInput input)
    {
        var query = await base.CreateFilteredQueryAsync(input);
        return query
            .WhereIf(input.ProjectId.HasValue, x => x.ProjectId == input.ProjectId)
            .WhereIf(!string.IsNullOrWhiteSpace(input.Filter), x => x.Name.Contains(input.Filter!));
    }

    [HttpGet("all")]
    [SwaggerOperation(Summary = "Get pipelines" )]
    [ProducesResponseType(typeof(PagedResultDto<PipelineListItemDto>), StatusCodes.Status200OK)]
    public virtual async Task<PagedResultDto<PipelineListItemDto>> GetAllAsync(PipelineGetListInput input)
    {
        var pipelineQuery = await Repository.GetQueryableAsync();
        var projectQuery  = await _projectRepository.GetQueryableAsync();

        var filtered = from pl in pipelineQuery
                       join pr in projectQuery on pl.ProjectId equals pr.Id
                       where (!input.ProjectId.HasValue || pl.ProjectId == input.ProjectId)
                          && (string.IsNullOrWhiteSpace(input.Filter) || pl.Name.Contains(input.Filter!))
                       select new { pl, pr };

        var total = await AsyncExecuter.CountAsync(filtered);

        // Поддерживаем дружелюбные поля сортировки: LastRun/Name/Status (+fallback CreationTime)
        var sorting = (input.Sorting ?? "LastRun desc").Trim();
        string sortExpression;
        if (sorting.StartsWith("LastRun", StringComparison.OrdinalIgnoreCase))
        {
            sortExpression = sorting.EndsWith("desc", StringComparison.OrdinalIgnoreCase)
                ? "pl.FinishedAt ?? pl.StartedAt desc"
                : "pl.FinishedAt ?? pl.StartedAt";
        }
        else if (sorting.StartsWith("Name", StringComparison.OrdinalIgnoreCase))
        {
            sortExpression = sorting.EndsWith("desc", StringComparison.OrdinalIgnoreCase) ? "pl.Name desc" : "pl.Name";
        }
        else if (sorting.StartsWith("Status", StringComparison.OrdinalIgnoreCase))
        {
            sortExpression = sorting.EndsWith("desc", StringComparison.OrdinalIgnoreCase) ? "pl.Status desc" : "pl.Status";
        }
        else
        {
            sortExpression = "pl.CreationTime desc";
        }

        var items = await AsyncExecuter.ToListAsync(
            filtered.OrderBy(sortExpression)
                    .Skip(input.SkipCount)
    }
}
