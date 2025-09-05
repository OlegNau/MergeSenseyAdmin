namespace AICodeReview.Nodes;

using System;
using System.ComponentModel.DataAnnotations;

public class PipelineNodeReorderDto
{
    [Required]
    public Guid NodeId { get; set; }

    [Range(0, int.MaxValue)]
    public int Order { get; set; }
}