using System;
using System.ComponentModel.DataAnnotations;
using Volo.Abp.Application.Dtos;
using AICodeReview.Consts;

namespace AICodeReview.Repositories.Dtos;

public class RepositoryDto : EntityDto<Guid>
{
    public Guid ProjectId { get; set; }
    public string Name { get; set; } = default!;
    public string Url { get; set; } = default!;
    public string? WebhookUrl { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreationTime { get; set; }
}

public class RepositoryCreateDto
{
    public Guid ProjectId { get; set; }
    [Required]
    [StringLength(CicdConsts.Lengths.NameLong)]
    public string Name { get; set; } = default!;

    [Required]
    [StringLength(CicdConsts.Lengths.Url)]
    public string Url { get; set; } = default!;

    [StringLength(CicdConsts.Lengths.Url)]
    public string? WebhookUrl { get; set; }
    public bool IsActive { get; set; } = true;
}

public class RepositoryUpdateDto
{
    [Required]
    [StringLength(CicdConsts.Lengths.NameLong)]
    public string Name { get; set; } = default!;

    [Required]
    [StringLength(CicdConsts.Lengths.Url)]
    public string Url { get; set; } = default!;

    [StringLength(CicdConsts.Lengths.Url)]
    public string? WebhookUrl { get; set; }
    public bool IsActive { get; set; }
}

public class RepositoryGetListInput : PagedAndSortedResultRequestDto
{
    public Guid? ProjectId { get; set; }
    public string? Filter { get; set; }
}