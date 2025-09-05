using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Linq;
using AICodeReview.Permissions;
using AICodeReview.Nodes;
using AICodeReview.Nodes.Dtos;

namespace AICodeReview.Services
{
    [Authorize(AICodeReviewPermissions.Nodes.Default)]
    public class PipelineNodeAppService : ApplicationService, IPipelineNodeAppService
    {
        private readonly IRepository<PipelineNode, Guid> _repository;

        public PipelineNodeAppService(IRepository<PipelineNode, Guid> repository)
        {
            _repository = repository;
        }

        public async Task<List<PipelineNodeDto>> GetAsync(Guid pipelineId)
        {
            var query = (await _repository.GetQueryableAsync())
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

        public async Task ReorderAsync(Guid pipelineId, List<PipelineNodeReorderDto> input)
        {
            var nodes = await _repository.GetListAsync(x => x.PipelineId == pipelineId);

            foreach (var item in input)
            {
                var node = nodes.FirstOrDefault(x => x.Id == item.NodeId);
                if (node != null)
                {
                    node.Order = item.Order;
                }
            }

            await _repository.UpdateManyAsync(nodes);
        }
    }
}
