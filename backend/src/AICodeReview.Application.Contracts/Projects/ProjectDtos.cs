using System;
using System.ComponentModel.DataAnnotations;
using Volo.Abp.Application.Dtos;
using AICodeReview.Consts;

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
    [Required]
    [StringLength(CicdConsts.Lengths.NameLong)]
    public string Name { get; set; } = default!;

    [StringLength(CicdConsts.Lengths.Description)]
    public string? Description { get; set; }

    [Required]
    [StringLength(CicdConsts.Lengths.Provider)]
    public string Provider { get; set; } = default!;

    [Required]
    [StringLength(CicdConsts.Lengths.RepoPath)]
    public string RepoPath { get; set; } = default!;

    [Required]
    [StringLength(CicdConsts.Lengths.DefaultBranch)]
    public string DefaultBranch { get; set; } = default!;

    [StringLength(CicdConsts.Lengths.AccessToken)]
    public string? GitAccessToken { get; set; }

    public bool IsActive { get; set; } = true;
}

public class ProjectUpdateDto
{
    [Required]
    [StringLength(CicdConsts.Lengths.NameLong)]
    public string Name { get; set; } = default!;

    [StringLength(CicdConsts.Lengths.Description)]
    public string? Description { get; set; }

    [Required]
    [StringLength(CicdConsts.Lengths.RepoPath)]
    public string RepoPath { get; set; } = default!;

    [Required]
    [StringLength(CicdConsts.Lengths.DefaultBranch)]
    public string DefaultBranch { get; set; } = default!;

    public bool IsActive { get; set; }

    [StringLength(CicdConsts.Lengths.AccessToken)]
    public string? GitAccessToken { get; set; }
}


public class ProjectSummaryDto : EntityDto<Guid>
{
    public string Name { get; set; } = default!;
    public string RepoPath { get; set; } = default!;
    public string Provider { get; set; } = default!;
    public bool IsActive { get; set; }                 
    public int TotalPipelinesCount { get; set; }
    public int ActivePipelinesCount { get; set; }
}

public class ProjectGetListInput : PagedAndSortedResultRequestDto
{
    public string? Filter { get; set; }
    public string? Provider { get; set; }
    public bool? IsActive { get; set; }   
}
