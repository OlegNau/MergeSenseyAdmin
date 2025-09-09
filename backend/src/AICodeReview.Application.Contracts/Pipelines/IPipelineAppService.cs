using System;
using System.Threading.Tasks;
using AICodeReview.Pipelines.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace AICodeReview.Services;

public interface IPipelineAppService
    : ICrudAppService<
        PipelineDto,               // DTO
        Guid,                      
        PagedAndSortedResultRequestDto, 
        CreateUpdatePipelineDto>   
{
    
    Task<ListResultDto<PipelineDto>> GetAllAsync();
}