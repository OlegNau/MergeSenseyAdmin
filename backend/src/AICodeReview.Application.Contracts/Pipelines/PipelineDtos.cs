using System;
using System.ComponentModel.DataAnnotations;
using Volo.Abp.Application.Dtos;
using AICodeReview.Consts;

namespace AICodeReview.Pipelines.Dtos;

public class PipelineDto : EntityDto<Guid>
{
    public Guid ProjectId { get; set; }
    public string Name { get; set; } = default!;
    public string Status { get; set; } = default!;
    public DateTime? StartedAt { get; set; }
    public DateTime? FinishedAt { get; set; }
    public int? DurationSeconds { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreationTime { get; set; }
}

public class PipelineCreateDto
{
    public Guid ProjectId { get; set; }
    [Required]
    [StringLength(CicdConsts.Lengths.NameLong)]
    public string Name { get; set; } = default!;

    [Required]
    [StringLength(CicdConsts.Lengths.PipelineStatus)]
    public string Status { get; set; } = default!;
    public bool IsActive { get; set; } = true;
}

public class PipelineUpdateDto
{
    [Required]
    [StringLength(CicdConsts.Lengths.NameLong)]
    public string Name { get; set; } = default!;

    [Required]
    [StringLength(CicdConsts.Lengths.PipelineStatus)]
    public string Status { get; set; } = default!;
    public bool IsActive { get; set; }
}

public class PipelineListItemDto : EntityDto<Guid>
{
    public string Name { get; set; } = default!;
    public string ProjectName { get; set; } = default!;
    public string Status { get; set; } = default!;
    public string? Trigger { get; set; }
    public DateTime? LastRun { get; set; }
}

public class PipelineGetListInput : PagedAndSortedResultRequestDto
{
    public Guid? ProjectId { get; set; }
    public string? Filter { get; set; }
}