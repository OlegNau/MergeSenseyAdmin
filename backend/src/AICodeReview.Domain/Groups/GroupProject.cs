namespace AICodeReview.Groups;

using System;
using AICodeReview.Projects;

public class GroupProject : CiCdAggregateRoot
{
    public virtual Guid GroupId { get; set; }
    public virtual Guid ProjectId { get; set; }

    public virtual Group? Group { get; set; }
    public virtual Project? Project { get; set; }
}
