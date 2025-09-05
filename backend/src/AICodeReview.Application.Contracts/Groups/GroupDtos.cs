using System;
using System.ComponentModel.DataAnnotations;
using Volo.Abp.Application.Dtos;
using AICodeReview.Consts;

namespace AICodeReview.Groups.Dtos;

public class GroupDto : EntityDto<Guid>
{
    public string Name { get; set; } = default!;
    public string? Description { get; set; }
    public DateTime CreationTime { get; set; }
}

public class GroupCreateDto
{
    [Required]
    [StringLength(CicdConsts.Lengths.NameLong)]
    public string Name { get; set; } = default!;

    [StringLength(CicdConsts.Lengths.Description)]
    public string? Description { get; set; }
}

public class GroupUpdateDto
{
    [Required]
    [StringLength(CicdConsts.Lengths.NameLong)]
    public string Name { get; set; } = default!;

    [StringLength(CicdConsts.Lengths.Description)]
    public string? Description { get; set; }
}

public class GroupProjectDto : EntityDto<Guid>
{
    public Guid GroupId { get; set; }
    public Guid ProjectId { get; set; }
}

public class GroupProjectCreateDto
{
    public Guid GroupId { get; set; }
    public Guid ProjectId { get; set; }
}

public class GroupProjectUpdateDto : GroupProjectCreateDto
{
}