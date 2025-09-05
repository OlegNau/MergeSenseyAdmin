using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Linq;
using AICodeReview.Permissions;
using AICodeReview.Triggers;
using AICodeReview.Triggers.Dtos;

namespace AICodeReview.Services;

[Authorize(AICodeReviewPermissions.Triggers.Default)]
public class TriggerAppService :
    CrudAppService<Trigger, TriggerDto, Guid, TriggerGetListInput, TriggerCreateDto, TriggerUpdateDto>,
    ITriggerAppService
{
    protected override string GetPolicyName { get; set; } = AICodeReviewPermissions.Triggers.Default;
    protected override string GetListPolicyName { get; set; } = AICodeReviewPermissions.Triggers.Default;
    protected override string CreatePolicyName { get; set; } = AICodeReviewPermissions.Triggers.Create;
    protected override string UpdatePolicyName { get; set; } = AICodeReviewPermissions.Triggers.Update;
    protected override string DeletePolicyName { get; set; } = AICodeReviewPermissions.Triggers.Delete;

    public TriggerAppService(IRepository<Trigger, Guid> repository)
        : base(repository)
    {
    }

    protected override async Task<IQueryable<Trigger>> CreateFilteredQueryAsync(TriggerGetListInput input)
    {
        var query = await base.CreateFilteredQueryAsync(input);
        return query
            .WhereIf(input.RepositoryId.HasValue, x => x.RepositoryId == input.RepositoryId)
            .WhereIf(input.BranchId.HasValue, x => x.BranchId == input.BranchId);
    }
}
