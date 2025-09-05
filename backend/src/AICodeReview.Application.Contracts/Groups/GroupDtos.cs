using System;
using Volo.Abp.Application.Dtos;

namespace AICodeReview.Groups.Dtos;

public class GroupDto : EntityDto<Guid>
{
    public string Name { get; set; } = default!;
    public string? Description { get; set; }
    public DateTime CreationTime { get; set; }
}

public class GroupCreateDto
{
    public string Name { get; set; } = default!;
    public string? Description { get; set; }
}

public class GroupUpdateDto
{
    public string Name { get; set; } = default!;
    public string? Description { get; set; }
}

public class GroupProjectDto : EntityDto<Guid>
{
    public Guid GroupId { get; set; }
    public Guid ProjectId { get; set; }
}