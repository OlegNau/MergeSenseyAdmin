using System;
using System.ComponentModel.DataAnnotations;
using Volo.Abp.Application.Dtos;
using AICodeReview.Consts;

namespace AICodeReview.Branches.Dtos;

public class BranchDto : EntityDto<Guid>
{
    public Guid RepositoryId { get; set; }
    public string Name { get; set; } = default!;
    public string? LastCommitSha { get; set; }
    public bool IsDefault { get; set; }
    public DateTime CreationTime { get; set; }
}

public class BranchCreateDto
{
    public Guid RepositoryId { get; set; }
    [Required]
    [StringLength(CicdConsts.Lengths.BranchName)]
    public string Name { get; set; } = default!;
    public bool IsDefault { get; set; }
}

public class BranchUpdateDto
{
    [Required]
    [StringLength(CicdConsts.Lengths.BranchName)]
    public string Name { get; set; } = default!;
    public bool IsDefault { get; set; }
}

public class BranchGetListInput : PagedAndSortedResultRequestDto
{
    public Guid? RepositoryId { get; set; }
    public string? Filter { get; set; }
}