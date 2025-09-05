using System;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using AICodeReview.Permissions;
using AICodeReview.Groups;
using AICodeReview.Groups.Dtos;

namespace AICodeReview.Services;

[Authorize(AICodeReviewPermissions.Groups.Default)]
public class GroupProjectAppService :
    CrudAppService<GroupProject, GroupProjectDto, Guid, GroupProjectGetListInput, GroupProjectCreateDto, GroupProjectUpdateDto>,
    IGroupProjectAppService
{
    protected override string GetPolicyName { get; set; } = AICodeReviewPermissions.Groups.Default;
    protected override string GetListPolicyName { get; set; } = AICodeReviewPermissions.Groups.Default;
    protected override string CreatePolicyName { get; set; } = AICodeReviewPermissions.Groups.Create;
    protected override string UpdatePolicyName { get; set; } = AICodeReviewPermissions.Groups.Update;
    protected override string DeletePolicyName { get; set; } = AICodeReviewPermissions.Groups.Delete;

    public GroupProjectAppService(IRepository<GroupProject, Guid> repository)
        : base(repository)
    {
    }

    protected override IQueryable<GroupProject> CreateFilteredQuery(GroupProjectGetListInput input)
    {
        var q = base.CreateFilteredQuery(input);
        if (input.GroupId.HasValue)
            q = q.Where(x => x.GroupId == input.GroupId.Value);
        if (input.ProjectId.HasValue)
            q = q.Where(x => x.ProjectId == input.ProjectId.Value);
        return q;
    }
}
