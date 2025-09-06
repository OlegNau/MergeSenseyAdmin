using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;

namespace AICodeReview.Pipelines.Dtos;

public class PipelineCreateDto
{
    public Guid ProjectId { get; set; }
    public string Name { get; set; } = default!;
    public string Status { get; set; } = default!;
    public bool IsActive { get; set; } = true;

    public AICodeReview.Triggers.Dtos.TriggerCreateDto? Trigger { get; set; }

    public List<PipelineCreateNodeItemDto>? Nodes { get; set; }
}

public class PipelineListItemDto : EntityDto<Guid>
{
    public string Name { get; set; } = default!;
    public string ProjectName { get; set; } = default!;
    public string Status { get; set; } = default!;
    public string? Trigger { get; set; }
    public DateTime? LastRun { get; set; }
}

public class PipelineCreateNodeItemDto
{
    public long TypeId { get; set; }
    public int Order { get; set; }
    public Dictionary<string, object>? ExtraProperties { get; set; }
}

public class PipelineNodeReorderDto
{
    public Guid NodeId { get; set; }
    public int Order { get; set; }
}
