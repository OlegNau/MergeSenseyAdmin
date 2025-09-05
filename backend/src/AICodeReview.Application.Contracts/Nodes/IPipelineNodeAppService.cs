using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace AICodeReview.Nodes.Dtos;

public interface IPipelineNodeAppService : IApplicationService
{
    Task<List<PipelineNodeDto>> GetAsync(Guid pipelineId);
    Task ReorderAsync(Guid pipelineId, List<PipelineNodeReorderDto> input);
}
