using System;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Linq;
using AICodeReview.Permissions;
using AICodeReview.Branches;
using AICodeReview.Branches.Dtos;

namespace AICodeReview.Services;

[Authorize(AICodeReviewPermissions.Branches.Default)]
[RemoteService]
[Route("api/app/branches")]
public class BranchAppService :
    CrudAppService<Branch, BranchDto, Guid, BranchGetListInput, BranchCreateDto, BranchUpdateDto>,
    IBranchAppService
{
    protected override string GetPolicyName { get; set; } = AICodeReviewPermissions.Branches.Default;
    protected override string GetListPolicyName { get; set; } = AICodeReviewPermissions.Branches.Default;
    protected override string CreatePolicyName { get; set; } = AICodeReviewPermissions.Branches.Create;
    protected override string UpdatePolicyName { get; set; } = AICodeReviewPermissions.Branches.Update;
    protected override string DeletePolicyName { get; set; } = AICodeReviewPermissions.Branches.Delete;

    public BranchAppService(IRepository<Branch, Guid> repository)
        : base(repository)
    {
    }

    protected override IQueryable<Branch> CreateFilteredQuery(BranchGetListInput input)
    {
        return base.CreateFilteredQuery(input)
            .WhereIf(input.RepositoryId.HasValue, x => x.RepositoryId == input.RepositoryId);
    }
}
