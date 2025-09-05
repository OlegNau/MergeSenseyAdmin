using System;
using Volo.Abp.Application.Dtos;

namespace AICodeReview.Triggers.Dtos;

public class TriggerDto : EntityDto<Guid>
{
    public long TypeId { get; set; }
    public Guid RepositoryId { get; set; }
    public Guid BranchId { get; set; }
    public string? ScheduleJson { get; set; }
    public DateTime CreationTime { get; set; }
}

public class TriggerCreateDto
{
    public long TypeId { get; set; }
    public Guid RepositoryId { get; set; }
    public Guid BranchId { get; set; }
    public string? ScheduleJson { get; set; }
}

public class TriggerUpdateDto
{
    public long TypeId { get; set; }
    public Guid RepositoryId { get; set; }
    public Guid BranchId { get; set; }
    public string? ScheduleJson { get; set; }
}

public class TriggerGetListInput : PagedAndSortedResultRequestDto
{
    public Guid? RepositoryId { get; set; }
    public Guid? BranchId { get; set; }
}