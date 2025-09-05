using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Linq;
using AICodeReview.Permissions;
using AICodeReview.Nodes;
using AICodeReview.Nodes.Dtos;

namespace AICodeReview.Services;

[Authorize(AICodeReviewPermissions.Nodes.Default)]
public class PipelineNodeAppService :
    CrudAppService<PipelineNode, PipelineNodeDto, Guid, PipelineNodeGetListInput, PipelineNodeCreateDto>,
    IPipelineNodeAppService
{
    protected override string GetPolicyName { get; set; } = AICodeReviewPermissions.Nodes.Default;
    protected override string GetListPolicyName { get; set; } = AICodeReviewPermissions.Nodes.Default;
    protected override string CreatePolicyName { get; set; } = AICodeReviewPermissions.Nodes.Create;
    protected override string UpdatePolicyName { get; set; } = AICodeReviewPermissions.Nodes.Update;
    protected override string DeletePolicyName { get; set; } = AICodeReviewPermissions.Nodes.Delete;

    public PipelineNodeAppService(IRepository<PipelineNode, Guid> repository)
        : base(repository)
    {
    }

    public virtual async Task<List<PipelineNodeDto>> GetPipelineNodesAsync(Guid pipelineId)
    {
        var query = (await Repository.GetQueryableAsync())
            .Where(x => x.PipelineId == pipelineId)
            .OrderBy(x => x.Order);

        return await AsyncExecuter.ToListAsync(query.Select(x => new PipelineNodeDto
        {
            Id = x.Id,
            PipelineId = x.PipelineId,
            NodeId = x.NodeId,
            Order = x.Order
        }));
    }

    public virtual async Task ReorderAsync(Guid pipelineId, List<PipelineNodeReorderDto> input)
    {
        var nodes = await Repository.GetListAsync(x => x.PipelineId == pipelineId);
        foreach (var item in input)
        {
            var node = nodes.FirstOrDefault(x => x.Id == item.NodeId);
            if (node != null)
            {
                node.Order = item.Order;
            }
        }
        await Repository.UpdateManyAsync(nodes);
    }
}
