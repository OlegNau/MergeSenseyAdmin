using System;
using System.ComponentModel.DataAnnotations;
using Volo.Abp.Application.Dtos;
using AICodeReview.Consts;

namespace AICodeReview.AiModels.Dtos;

public class AiModelDto : EntityDto<Guid>
{
    public string Name { get; set; } = default!;
    public string Provider { get; set; } = default!;
    public string Model { get; set; } = default!;
    public string? ApiBaseUrl { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreationTime { get; set; }
}

public class AiModelCreateDto
{
    [Required]
    [StringLength(CicdConsts.Lengths.Name)]
    public string Name { get; set; } = default!;

    [Required]
    [StringLength(CicdConsts.Lengths.Provider)]
    public string Provider { get; set; } = default!;

    [Required]
    [StringLength(CicdConsts.Lengths.Model)]
    public string Model { get; set; } = default!;

    [StringLength(CicdConsts.Lengths.ApiBaseUrl)]
    public string? ApiBaseUrl { get; set; }

    [StringLength(CicdConsts.Lengths.ApiKey)]
    public string? ApiKey { get; set; }

    public bool IsActive { get; set; } = true;
}

public class AiModelUpdateDto
{
    [Required]
    [StringLength(CicdConsts.Lengths.Name)]
    public string Name { get; set; } = default!;

    [Required]
    [StringLength(CicdConsts.Lengths.Provider)]
    public string Provider { get; set; } = default!;

    [Required]
    [StringLength(CicdConsts.Lengths.Model)]
    public string Model { get; set; } = default!;

    [StringLength(CicdConsts.Lengths.ApiBaseUrl)]
    public string? ApiBaseUrl { get; set; }

    [StringLength(CicdConsts.Lengths.ApiKey)]
    public string? ApiKey { get; set; }

    public bool IsActive { get; set; }
}

public class AiModelGetListInput : PagedAndSortedResultRequestDto
{
    public string? Filter { get; set; }
    public string? Provider { get; set; }
    public bool? IsActive { get; set; }
}
