namespace AICodeReview.Repositories;

using System;
using AICodeReview.Projects;

public class Repository : CiCdAggregateRoot
{
    public virtual string Name { get; set; } = string.Empty;
    public virtual string Url { get; set; } = string.Empty;
    public virtual string? WebhookUrl { get; set; }
    public virtual Guid ProjectId { get; set; }
    public virtual bool IsActive { get; set; } = true;

    public virtual Project? Project { get; set; }
}
