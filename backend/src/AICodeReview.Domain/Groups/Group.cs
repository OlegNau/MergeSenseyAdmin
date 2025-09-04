namespace AICodeReview.Groups;

public class Group : CiCdAggregateRoot
{
    public virtual string Name { get; set; } = string.Empty;
    public virtual string? Description { get; set; }
}
