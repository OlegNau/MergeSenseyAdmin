namespace AICodeReview.Nodes;

public class Node : CiCdAggregateRoot
{
    public virtual long TypeId { get; set; }
    public virtual NodeType? Type { get; set; }
}
