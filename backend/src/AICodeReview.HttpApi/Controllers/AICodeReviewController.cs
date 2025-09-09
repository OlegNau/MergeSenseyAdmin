using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp.Application.Dtos;
using Volo.Abp.AspNetCore.Mvc;

using AICodeReview.Pipelines.Dtos;
using AICodeReview.Services;

namespace AICodeReview.Controllers;

[Area("app")]
[Route("api/app/pipeline")]
public class PipelinesController : AbpController
{
    private readonly IPipelineAppService _service;

    public PipelinesController(IPipelineAppService service)
    {
        _service = service;
    }

    [HttpGet("all")]
    public Task<ListResultDto<PipelineDto>> GetAllAsync()
        => _service.GetAllAsync();
}