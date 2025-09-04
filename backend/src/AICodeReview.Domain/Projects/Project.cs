namespace AICodeReview.Projects;

public class Project : CiCdAggregateRoot
{
    public virtual string Name { get; set; } = string.Empty;
    public virtual string? Description { get; set; }
    public virtual string Provider { get; set; } = string.Empty;
    public virtual string RepoPath { get; set; } = string.Empty;
    public virtual string DefaultBranch { get; set; } = string.Empty;
    public virtual string? GitAccessToken { get; set; }
    public virtual bool IsActive { get; set; } = true;
}
