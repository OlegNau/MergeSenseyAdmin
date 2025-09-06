using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using AICodeReview.Pipelines;
using AICodeReview.Pipelines.Dtos;

namespace AICodeReview.Services;

[Area("app")]
[RemoteService(Name = "AICodeReview")]
[Route("api/app/pipelines")]
public class PipelineAppService
    : CrudAppService<Pipeline, PipelineDto, Guid, PagedAndSortedResultRequestDto, CreateUpdatePipelineDto>,
      IPipelineAppService
{
    public PipelineAppService(IRepository<Pipeline, Guid> repository)
        : base(repository)
    {
    }

    // GET /api/app/pipelines (пагинация)
    [HttpGet]
    public override Task<PagedResultDto<PipelineDto>> GetListAsync(PagedAndSortedResultRequestDto input)
        => base.GetListAsync(input);

    // GET /api/app/pipelines/all (все записи) — отдельный путь, чтобы не конфликтовать со Swagger
    [HttpGet("all")]
    public async Task<ListResultDto<PipelineDto>> GetAllAsync()
    {
        var entities = await Repository.GetListAsync();
        var dtos = ObjectMapper.Map<List<Pipeline>, List<PipelineDto>>(entities);
        return new ListResultDto<PipelineDto>(dtos);
    }
}
