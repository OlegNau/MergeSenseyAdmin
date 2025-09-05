using System;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Linq;
using AICodeReview.Permissions;
using AICodeReview.Repositories;
using AICodeReview.Repositories.Dtos;

namespace AICodeReview.Services;

[Authorize(AICodeReviewPermissions.Repositories.Default)]
public class RepositoryAppService :
    CrudAppService<Repository, RepositoryDto, Guid, RepositoryGetListInput, RepositoryCreateDto, RepositoryUpdateDto>,
    IRepositoryAppService
{
    protected override string GetPolicyName { get; set; } = AICodeReviewPermissions.Repositories.Default;
    protected override string GetListPolicyName { get; set; } = AICodeReviewPermissions.Repositories.Default;
    protected override string CreatePolicyName { get; set; } = AICodeReviewPermissions.Repositories.Create;
    protected override string UpdatePolicyName { get; set; } = AICodeReviewPermissions.Repositories.Update;
    protected override string DeletePolicyName { get; set; } = AICodeReviewPermissions.Repositories.Delete;

    public RepositoryAppService(IRepository<Repository, Guid> repository)
        : base(repository)
    {
    }

    protected override IQueryable<Repository> CreateFilteredQuery(RepositoryGetListInput input)
    {
        return base.CreateFilteredQuery(input)
            .WhereIf(input.ProjectId.HasValue, x => x.ProjectId == input.ProjectId)
            .WhereIf(!string.IsNullOrWhiteSpace(input.Filter), x => x.Name.Contains(input.Filter!));
    }
}
