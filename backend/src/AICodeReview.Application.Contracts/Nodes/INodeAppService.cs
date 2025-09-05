using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace AICodeReview.Nodes.Dtos;

public interface INodeAppService : ICrudAppService<NodeDto, Guid, PagedAndSortedResultRequestDto, NodeCreateDto>
{
}
