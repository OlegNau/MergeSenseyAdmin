using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace AICodeReview.Nodes.Dtos;

public interface IPipelineNodeAppService : ICrudAppService<PipelineNodeDto, Guid, PagedAndSortedResultRequestDto, PipelineNodeCreateDto>
{
    Task<List<PipelineNodeDto>> GetPipelineNodesAsync(Guid pipelineId);
    Task ReorderAsync(Guid pipelineId, List<PipelineNodeReorderDto> input);
}
