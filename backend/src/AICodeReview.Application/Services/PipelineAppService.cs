using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp;                              // RemoteService
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

using AICodeReview.Pipelines;
using AICodeReview.Pipelines.Dtos;

namespace AICodeReview.Services;

[RemoteService(Name = "AICodeReview")]
public class PipelineAppService
    : CrudAppService<Pipeline, PipelineDto, Guid, PagedAndSortedResultRequestDto, CreateUpdatePipelineDto>,
        IPipelineAppService
{
    public PipelineAppService(IRepository<Pipeline, Guid> repository)
        : base(repository)
    {
    }

    // Пагинация — остаётся как есть (авто-контроллер ABP повесит GET /api/app/pipeline)
    public override Task<PagedResultDto<PipelineDto>> GetListAsync(PagedAndSortedResultRequestDto input)
        => base.GetListAsync(input);

    // Отдельный "все записи" — скрываем от авто-контроллера, чтобы не было конфликта маршрутов
    [RemoteService(false)]
    public async Task<ListResultDto<PipelineDto>> GetAllAsync()
    {
        var entities = await Repository.GetListAsync();
        var dtos = ObjectMapper.Map<List<Pipeline>, List<PipelineDto>>(entities);
        return new ListResultDto<PipelineDto>(dtos);
    }
}