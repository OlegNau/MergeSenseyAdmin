namespace AICodeReview.Pipelines;

using System;
using Volo.Abp.Application.Dtos;

public class PipelineGetListInput : PagedAndSortedResultRequestDto
{
    public Guid? ProjectId { get; set; }
    public string? Status { get; set; }
    public string? Filter { get; set; }
}