using System;
using Volo.Abp.Application.Dtos;

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
    public string Name { get; set; } = default!;
    public string Provider { get; set; } = default!;
    public string Model { get; set; } = default!;
    public string? ApiBaseUrl { get; set; }
    public string? ApiKey { get; set; }
    public bool IsActive { get; set; } = true;
}

public class AiModelUpdateDto
{
    public string Name { get; set; } = default!;
    public string Provider { get; set; } = default!;
    public string Model { get; set; } = default!;
    public string? ApiBaseUrl { get; set; }
    public string? ApiKey { get; set; }
    public bool IsActive { get; set; }
}