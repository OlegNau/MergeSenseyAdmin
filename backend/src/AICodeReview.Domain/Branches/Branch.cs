namespace AICodeReview.Branches;

using System;
using AICodeReview.Repositories;

public class Branch : CiCdAggregateRoot
{
    public virtual string Name { get; set; } = string.Empty;
    public virtual string? LastCommitSha { get; set; }
    public virtual bool IsDefault { get; set; }
    public virtual Guid RepositoryId { get; set; }

    public virtual Repository? Repository { get; set; }
}
