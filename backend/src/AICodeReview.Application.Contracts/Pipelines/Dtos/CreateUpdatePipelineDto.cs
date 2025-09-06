using System;
using Volo.Abp.Application.Dtos;

namespace AICodeReview.Pipelines.Dtos;

public class CreateUpdatePipelineDto : IEntityDto
{
    public string Name { get; set; } = default!;
    public string? Description { get; set; }
    public Guid ProjectId { get; set; }
    public bool IsActive { get; set; } = true;
}
