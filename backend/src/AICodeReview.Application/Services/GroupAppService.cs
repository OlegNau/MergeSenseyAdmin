using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using AICodeReview.Permissions;
using AICodeReview.Groups;
using AICodeReview.Groups.Dtos;

namespace AICodeReview.Services;

[Authorize(AICodeReviewPermissions.Groups.Default)]
[RemoteService]
[Route("api/app/groups")]
public class GroupAppService :
    CrudAppService<Group, GroupDto, Guid, PagedAndSortedResultRequestDto, GroupCreateDto, GroupUpdateDto>,
    IGroupAppService
{
    protected override string GetPolicyName { get; set; } = AICodeReviewPermissions.Groups.Default;
    protected override string GetListPolicyName { get; set; } = AICodeReviewPermissions.Groups.Default;
    protected override string CreatePolicyName { get; set; } = AICodeReviewPermissions.Groups.Create;
    protected override string UpdatePolicyName { get; set; } = AICodeReviewPermissions.Groups.Update;
    protected override string DeletePolicyName { get; set; } = AICodeReviewPermissions.Groups.Delete;

    public GroupAppService(IRepository<Group, Guid> repository)
        : base(repository)
    {
    }
}
