namespace AICodeReview.Nodes;

public class NodeType : CiCdAggregateRoot<long>
{
    public virtual string Name { get; set; } = string.Empty;
}
