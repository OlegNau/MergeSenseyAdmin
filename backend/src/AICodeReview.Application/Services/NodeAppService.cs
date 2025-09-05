using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using AICodeReview.Permissions;
using AICodeReview.Nodes;
using AICodeReview.Nodes.Dtos;

namespace AICodeReview.Services;

[Authorize(AICodeReviewPermissions.Nodes.Default)]
[RemoteService]
[Route("api/app/nodes")]
public class NodeAppService :
    CrudAppService<Node, NodeDto, Guid, PagedAndSortedResultRequestDto, NodeCreateDto, NodeCreateDto>,
    INodeAppService
{
    protected override string GetPolicyName { get; set; } = AICodeReviewPermissions.Nodes.Default;
    protected override string GetListPolicyName { get; set; } = AICodeReviewPermissions.Nodes.Default;
    protected override string CreatePolicyName { get; set; } = AICodeReviewPermissions.Nodes.Create;
    protected override string UpdatePolicyName { get; set; } = AICodeReviewPermissions.Nodes.Update;
    protected override string DeletePolicyName { get; set; } = AICodeReviewPermissions.Nodes.Delete;

    public NodeAppService(IRepository<Node, Guid> repository)
        : base(repository)
    {
    }
}
