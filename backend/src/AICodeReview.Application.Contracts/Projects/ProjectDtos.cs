using System;
using Volo.Abp.Application.Dtos;

namespace AICodeReview.Projects.Dtos;

public class ProjectDto : EntityDto<Guid>
{
    public string Name { get; set; } = default!;
    public string? Description { get; set; }
    public string Provider { get; set; } = default!;
    public string RepoPath { get; set; } = default!;
    public string DefaultBranch { get; set; } = default!;
    public bool IsActive { get; set; }
    public DateTime CreationTime { get; set; }
}

public class ProjectCreateDto
{
    public string Name { get; set; } = default!;
    public string? Description { get; set; }
    public string Provider { get; set; } = default!;
    public string RepoPath { get; set; } = default!;
    public string DefaultBranch { get; set; } = default!;
    public string? GitAccessToken { get; set; }
    public bool IsActive { get; set; } = true;
}

public class ProjectUpdateDto
{
    public string Name { get; set; } = default!;
    public string? Description { get; set; }
    public string RepoPath { get; set; } = default!;
    public string DefaultBranch { get; set; } = default!;
    public bool IsActive { get; set; }
    public string? GitAccessToken { get; set; }
}

public class ProjectSummaryDto : EntityDto<Guid>
{
    public string Name { get; set; } = default!;
    public string Provider { get; set; } = default!;
    public string RepoPath { get; set; } = default!;
    public string DefaultBranch { get; set; } = default!;
    public int ActivePipelinesCount { get; set; }
    public int TotalPipelinesCount { get; set; }
}