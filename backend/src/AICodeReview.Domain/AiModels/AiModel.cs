namespace AICodeReview.AiModels;

public class AiModel : CiCdAggregateRoot
{
    public virtual string Name { get; set; } = string.Empty;
    public virtual string Provider { get; set; } = string.Empty;
    public virtual string Model { get; set; } = string.Empty;
    public virtual string? ApiBaseUrl { get; set; }
    public virtual string? ApiKey { get; set; }
    public virtual bool IsActive { get; set; } = true;
}
