namespace AICodeReview.Nodes;

using System;
using AICodeReview.Pipelines;

public class PipelineNode : CiCdAggregateRoot
{
    public virtual Guid PipelineId { get; set; }
    public virtual Guid NodeId { get; set; }
    public virtual int Order { get; set; }

    public virtual Pipeline? Pipeline { get; set; }
    public virtual Node? Node { get; set; }
}
