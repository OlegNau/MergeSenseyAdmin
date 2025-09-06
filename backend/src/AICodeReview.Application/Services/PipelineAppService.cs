using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

using AICodeReview.Pipelines;       // сущность Pipeline
using AICodeReview.Pipelines.Dtos;  // DTO’шки

namespace AICodeReview.Services;

public class PipelineAppService
    : CrudAppService<Pipeline, PipelineDto, Guid, PagedAndSortedResultRequestDto, CreateUpdatePipelineDto>,
        IPipelineAppService
{
    public PipelineAppService(IRepository<Pipeline, Guid> repository)
        : base(repository)
    {
    }

    // Пагинированный список (оставляем как есть — ABP сам повесит маршрут GET /api/app/pipeline)
    public override Task<PagedResultDto<PipelineDto>> GetListAsync(PagedAndSortedResultRequestDto input)
        => base.GetListAsync(input);

    // Все записи. ABP сгенерирует GET /api/app/pipeline/all (по имени метода).
    public async Task<ListResultDto<PipelineDto>> GetAllAsync()
    {
        var entities = await Repository.GetListAsync();
        var dtos = ObjectMapper.Map<List<Pipeline>, List<PipelineDto>>(entities);
        return new ListResultDto<PipelineDto>(dtos);
    }
}