using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace AICodeReview.Pipelines.Dtos;

public interface IPipelineAppService : ICrudAppService<PipelineDto, Guid, PagedAndSortedResultRequestDto, PipelineCreateDto, PipelineUpdateDto>
{
    Task<PagedResultDto<PipelineListItemDto>> GetAllAsync(PagedAndSortedResultRequestDto input);
}
