using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using AICodeReview.Permissions;
using AICodeReview.Nodes;
using AICodeReview.Nodes.Dtos;

namespace AICodeReview.Services;

[Authorize(AICodeReviewPermissions.Nodes.Default)]
public class NodeAppService :
    CrudAppService<Node, NodeDto, Guid, NodeGetListInput, NodeCreateDto>,
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

    protected override async Task<IQueryable<Node>> CreateFilteredQueryAsync(NodeGetListInput input)
    {
        var query = await base.CreateFilteredQueryAsync(input);
        return query
            .WhereIf(input.TypeId.HasValue, x => x.TypeId == input.TypeId);
    }

}
