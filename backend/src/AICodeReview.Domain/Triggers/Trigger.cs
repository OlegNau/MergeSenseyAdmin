namespace AICodeReview.Triggers;

using System;
using AICodeReview.Repositories;
using AICodeReview.Branches;

public class Trigger : CiCdAggregateRoot
{
    public virtual Guid RepositoryId { get; set; }
    public virtual Guid BranchId { get; set; }
    public virtual long TypeId { get; set; }
    public virtual string? ScheduleJson { get; set; }

    public virtual Repository? Repository { get; set; }
    public virtual Branch? Branch { get; set; }
    public virtual TriggerType? Type { get; set; }
}
