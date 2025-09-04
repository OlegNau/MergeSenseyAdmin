namespace AICodeReview.Triggers;

public class TriggerType : CiCdAggregateRoot<long>
{
    public virtual string Name { get; set; } = string.Empty;
}
