namespace AICodeReview.Pipelines;

using System;
using System.ComponentModel.DataAnnotations;

public class PipelineUpdateDto
{
    [Required, StringLength(256)]
    public string Name { get; set; } = default!;

    [Required, StringLength(32)]
    public string Status { get; set; } = default!;

    public bool IsActive { get; set; } = true;

    public DateTime? StartedAt { get; set; }
    public DateTime? FinishedAt { get; set; }
}