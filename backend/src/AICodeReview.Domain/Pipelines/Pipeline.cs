namespace AICodeReview.Pipelines;

using System;
using AICodeReview.Projects;

public class Pipeline : CiCdAggregateRoot
{
    public virtual Guid ProjectId { get; set; }
    public virtual string Name { get; set; } = string.Empty;
    public virtual string Status { get; set; } = string.Empty;
    public virtual DateTime? StartedAt { get; set; }
    public virtual DateTime? FinishedAt { get; set; }
    public virtual int? DurationSeconds { get; set; }
    public virtual bool IsActive { get; set; } = true;

    public virtual Project? Project { get; set; }
}
