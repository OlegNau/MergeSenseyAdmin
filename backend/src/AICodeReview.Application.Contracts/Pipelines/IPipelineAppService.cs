using System;
using System.Threading.Tasks;
using AICodeReview.Pipelines.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace AICodeReview.Services;

public interface IPipelineAppService
    : ICrudAppService<
        PipelineDto,               // DTO
        Guid,                      // первичный ключ
        PagedAndSortedResultRequestDto, // вход для листинга (пагинация/сортировка)
        CreateUpdatePipelineDto>   // DTO для создания/обновления
{
    /// <summary>Вернуть все пайплайны без пагинации.</summary>
    Task<ListResultDto<PipelineDto>> GetAllAsync();
}